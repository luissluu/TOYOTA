// src/composables/useFormulario.js
import { reactive, computed, ref } from 'vue';
import { campoRequerido } from '../utils/validaciones';

/**
 * Hook para manejar un formulario con validaciones
 * @param {Object} esquemaValidacion - Objeto con las reglas de validación para cada campo
 * @param {Object} valoresIniciales - Valores iniciales del formulario
 * @returns {Object} - Objeto con funciones y datos para manejar el formulario
 */
export function useFormulario(esquemaValidacion = {}, valoresIniciales = {}) {
  // Estado del formulario
  const formulario = reactive({...valoresIniciales});
  
  // Errores del formulario
  const errores = reactive({});
  
  // Estado de validación del formulario
  const formularioValido = ref(false);
  
  // Estado de carga
  const cargando = ref(false);
  
  // Estado de éxito
  const exito = ref(false);
  
  // Mensaje de error global
  const errorGlobal = ref('');
  
  // Obtener todos los campos del formulario
  const campos = computed(() => Object.keys(formulario));
  
  /**
   * Valida un campo individual
   * @param {string} campo - Nombre del campo a validar
   * @returns {boolean} - true si el campo es válido, false si no
   */
  const validarCampo = (campo) => {
    // Si no existe el esquema de validación para ese campo, es válido
    if (!esquemaValidacion[campo]) {
      errores[campo] = '';
      return true;
    }
    
    const reglas = esquemaValidacion[campo];
    let esValido = true;
    errores[campo] = '';
    
    // Regla de campo requerido
    if (reglas.requerido && campoRequerido(formulario[campo])) {
      errores[campo] = reglas.mensajes?.requerido || 'Este campo es requerido';
      esValido = false;
    }
    
    // Validador personalizado
    if (esValido && reglas.validador && typeof reglas.validador === 'function') {
      const validado = reglas.validador(formulario[campo], formulario);
      if (!validado) {
        errores[campo] = reglas.mensajes?.validador || 'Este campo no es válido';
        esValido = false;
      }
    }
    
    return esValido;
  };
  
  /**
   * Valida todo el formulario
   * @returns {boolean} - true si todo el formulario es válido, false si no
   */
  const validarFormulario = () => {
    let esValido = true;
    
    // Valida cada campo
    for (const campo of campos.value) {
      if (esquemaValidacion[campo] && !validarCampo(campo)) {
        esValido = false;
      }
    }
    
    formularioValido.value = esValido;
    return esValido;
  };
  
  /**
   * Maneja el evento de cambio de valor de un campo
   * @param {string} campo - Nombre del campo
   * @param {any} valor - Nuevo valor del campo
   */
  const actualizarCampo = (campo, valor) => {
    formulario[campo] = valor;
    
    // Si hay validación inmediata, valida el campo
    if (esquemaValidacion[campo]?.validarInmediato) {
      validarCampo(campo);
    }
  };
  
  /**
   * Maneja el evento de pérdida de foco de un campo
   * @param {string} campo - Nombre del campo
   */
  const alPerderFoco = (campo) => {
    if (esquemaValidacion[campo]) {
      validarCampo(campo);
    }
  };
  
  /**
   * Resetea el formulario a sus valores iniciales
   */
  const resetearFormulario = () => {
    // Resetear valores
    Object.keys(formulario).forEach(key => {
      formulario[key] = valoresIniciales[key] || '';
    });
    
    // Resetear errores
    Object.keys(errores).forEach(key => {
      errores[key] = '';
    });
    
    // Resetear estados
    errorGlobal.value = '';
    formularioValido.value = false;
    exito.value = false;
  };
  
  /**
   * Maneja el envío del formulario
   * @param {Function} fnEnvio - Función a ejecutar si el formulario es válido
   * @returns {Promise} - Promesa resuelta con el resultado de fnEnvio
   */
  const enviarFormulario = async (fnEnvio) => {
    // Validar todo el formulario
    if (!validarFormulario()) {
      return false;
    }
    
    // Cambiar estado de carga
    cargando.value = true;
    errorGlobal.value = '';
    
    try {
      // Ejecutar la función de envío
      const resultado = await fnEnvio(formulario);
      exito.value = true;
      return resultado;
    } catch (error) {
      // Manejar error
      errorGlobal.value = error.message || 'Ha ocurrido un error al procesar la solicitud';
      return false;
    } finally {
      // Finalizar carga
      cargando.value = false;
    }
  };
  
  return {
    formulario,
    errores,
    cargando,
    exito,
    errorGlobal,
    formularioValido,
    validarCampo,
    validarFormulario,
    actualizarCampo,
    alPerderFoco,
    resetearFormulario,
    enviarFormulario
  };
}