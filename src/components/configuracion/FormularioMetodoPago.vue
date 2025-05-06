<!-- src/components/configuracion/FormularioMetodoPago.vue -->
<template>
    <div class="bg-gray-700 rounded-lg p-6">
      <h4 class="text-lg font-medium text-white mb-4">{{ modo === 'editar' ? 'Editar Método de Pago' : 'Añadir Nuevo Método de Pago' }}</h4>
      
      <form @submit.prevent="manejarSubmit" class="space-y-4">
        <!-- Tipo de tarjeta -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Tipo de Tarjeta</label>
          <div class="grid grid-cols-3 gap-2">
            <div
              @click="seleccionarTipoTarjeta('visa')"
              :class="[
                'border rounded-lg p-3 flex justify-center cursor-pointer transition-colors',
                formulario.tipo === 'visa' ? 'border-blue-500 bg-blue-900 bg-opacity-30' : 'border-gray-600 hover:border-blue-400'
              ]"
            >
              <svg class="w-10 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="6" fill="#1434CB" />
                <path d="M18 26H30V33H18V26Z" fill="#F7B600" />
                <path d="M18 15H30V24H18V15Z" fill="#FFFFFF" />
              </svg>
            </div>
  
            <div
              @click="seleccionarTipoTarjeta('mastercard')"
              :class="[
                'border rounded-lg p-3 flex justify-center cursor-pointer transition-colors',
                formulario.tipo === 'mastercard' ? 'border-blue-500 bg-blue-900 bg-opacity-30' : 'border-gray-600 hover:border-blue-400'
              ]"
            >
              <svg class="w-10 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="6" fill="#EB001B" />
                <circle cx="16" cy="24" r="8" fill="#FF5F00" />
                <circle cx="32" cy="24" r="8" fill="#F79E1B" />
              </svg>
            </div>
  
            <div
              @click="seleccionarTipoTarjeta('amex')"
              :class="[
                'border rounded-lg p-3 flex justify-center cursor-pointer transition-colors',
                formulario.tipo === 'amex' ? 'border-blue-500 bg-blue-900 bg-opacity-30' : 'border-gray-600 hover:border-blue-400'
              ]"
            >
              <svg class="w-10 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="6" fill="#016FD0" />
                <path d="M24 31H36V17H24V31Z" fill="#FFFFFF" />
              </svg>
            </div>
          </div>
          <p v-if="errores.tipo" class="mt-1 text-sm text-red-500">{{ errores.tipo }}</p>
        </div>
  
        <!-- Número de tarjeta -->
        <CampoValidado
          id="numeroTarjeta"
          v-model="formulario.numeroTarjeta"
          :error="errores.numeroTarjeta"
          @update:error="errores.numeroTarjeta = $event"
          @validacion="validacionCampo('numeroTarjeta', $event)"
          @blur="alPerderFoco('numeroTarjeta')"
          label="Número de Tarjeta"
          placeholder="1234 5678 9012 3456"
          required
          :maxlength="19"
          :validator="validarNumeroTarjeta"
          errorMessage="Número de tarjeta inválido"
        >
          <template #icono>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" />
            </svg>
          </template>
          <template #iconoDerecha v-if="formulario.numeroTarjeta">
            <svg v-if="formulario.tipo === 'visa'" class="w-8 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="6" fill="#1434CB" />
              <path d="M18 26H30V33H18V26Z" fill="#F7B600" />
              <path d="M18 15H30V24H18V15Z" fill="#FFFFFF" />
            </svg>
  
            <svg v-else-if="formulario.tipo === 'mastercard'" class="w-8 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="6" fill="#EB001B" />
              <circle cx="16" cy="24" r="8" fill="#FF5F00" />
              <circle cx="32" cy="24" r="8" fill="#F79E1B" />
            </svg>
  
            <svg v-else-if="formulario.tipo === 'amex'" class="w-8 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="6" fill="#016FD0" />
              <path d="M24 31H36V17H24V31Z" fill="#FFFFFF" />
            </svg>
          </template>
        </CampoValidado>
  
        <!-- Nombre del titular -->
        <CampoValidado
          id="nombreTitular"
          v-model="formulario.nombreTitular"
          :error="errores.nombreTitular"
          @update:error="errores.nombreTitular = $event"
          @validacion="validacionCampo('nombreTitular', $event)"
          @blur="alPerderFoco('nombreTitular')"
          label="Nombre del Titular"
          placeholder="Como aparece en la tarjeta"
          required
          :validator="validarNombreTitular"
          errorMessage="Por favor ingresa el nombre completo"
        >
          <template #icono>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </template>
        </CampoValidado>
  
        <!-- Fecha de expiración y CVV -->
        <div class="grid grid-cols-2 gap-4">
          <CampoValidado
            id="fechaExpiracion"
            v-model="formulario.fechaExpiracion"
            :error="errores.fechaExpiracion"
            @update:error="errores.fechaExpiracion = $event"
            @validacion="validacionCampo('fechaExpiracion', $event)"
            @blur="alPerderFoco('fechaExpiracion')"
            label="Fecha de Expiración"
            placeholder="MM/AA"
            required
            :maxlength="5"
            :validator="validarFechaExpiracion"
            errorMessage="Formato MM/AA inválido"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
  
          <CampoValidado
            id="cvv"
            v-model="formulario.cvv"
            :error="errores.cvv"
            @update:error="errores.cvv = $event"
            @validacion="validacionCampo('cvv', $event)"
            @blur="alPerderFoco('cvv')"
            label="CVV"
            placeholder="123"
            required
            type="password"
            :maxlength="4"
            soloNumeros
            :validator="validarCVV"
            errorMessage="CVV inválido"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
        </div>
  
        <!-- Tarjeta predeterminada -->
        <div class="flex items-center space-x-2 px-3 py-2 bg-gray-600 rounded-md">
          <input
            id="predeterminada"
            v-model="formulario.predeterminada"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-500 text-blue-600 focus:ring-blue-500"
          />
          <label for="predeterminada" class="text-white text-sm">
            Establecer como método de pago predeterminado
          </label>
        </div>
  
        <!-- Botones de acción -->
        <div class="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            @click="cancelar"
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
          <button
  type="submit"
  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
  :disabled="cargando"
>
  <svg v-if="cargando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  {{ cargando ? 'Guardando...' : 'Guardar' }}
</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import CampoValidado from '../ui/CampoValidado.vue';
  import { useFormulario } from '../../composables/useFormulario';
  
  const props = defineProps({
    metodoPago: {
      type: Object,
      default: () => ({})
    },
    modo: {
      type: String,
      default: 'agregar', // 'agregar' o 'editar'
      validator: (value) => ['agregar', 'editar'].includes(value)
    }
  });
  
  const emit = defineEmits(['guardar', 'cancelar']);
  
  // Funciones de validación adicionales
  const validarNumeroTarjeta = (valor) => {
    if (!valor) return true; // Si está vacío, lo manejará la validación de requerido
    
    // Eliminar espacios y guiones
    const numeroLimpio = valor.replace(/[\s-]/g, '');
    
    // Validar según el tipo de tarjeta
    if (formulario.tipo === 'visa') {
      // Visa comienza con 4 y tiene 16 dígitos
      return /^4[0-9]{15}$/.test(numeroLimpio);
    } else if (formulario.tipo === 'mastercard') {
      // Mastercard comienza con 51-55 o 2221-2720 y tiene 16 dígitos
      return /^(5[1-5][0-9]{14}|2[2-7][0-9]{14})$/.test(numeroLimpio);
    } else if (formulario.tipo === 'amex') {
      // American Express comienza con 34 o 37 y tiene 15 dígitos
      return /^3[47][0-9]{13}$/.test(numeroLimpio);
    }
    
    // Validación genérica (si no se ha seleccionado tipo)
    return /^[0-9]{13,19}$/.test(numeroLimpio);
  };
  
  const validarNombreTitular = (valor) => {
    if (!valor) return true; // Si está vacío, lo manejará la validación de requerido
    
    // Al menos dos palabras (nombre y apellido)
    return valor.trim().split(/\s+/).filter(word => word.length > 0).length >= 2;
  };
  
  const validarFechaExpiracion = (valor) => {
    if (!valor) return true; // Si está vacío, lo manejará la validación de requerido
    
    // Formato MM/AA
    if (!/^\d{2}\/\d{2}$/.test(valor)) return false;
    
    const [mes, anio] = valor.split('/').map(part => parseInt(part, 10));
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear() % 100; // Últimos dos dígitos del año
    const mesActual = fechaActual.getMonth() + 1; // Enero es 0
    
    // Validar rango del mes (1-12)
    if (mes < 1 || mes > 12) return false;
    
    // Validar que la fecha no esté vencida
    if (anio < anioActual || (anio === anioActual && mes < mesActual)) return false;
    
    return true;
  };
  
  const validarCVV = (valor) => {
    if (!valor) return true; // Si está vacío, lo manejará la validación de requerido
    
    // American Express tiene CVV de 4 dígitos, el resto de 3
    if (formulario.tipo === 'amex') {
      return /^\d{4}$/.test(valor);
    }
    
    return /^\d{3}$/.test(valor);
  };

  // Esquema de validación del formulario
  const esquemaValidacion = {
    tipo: {
      requerido: true,
      mensajes: {
        requerido: 'Selecciona un tipo de tarjeta'
      }
    },
    numeroTarjeta: {
      requerido: true,
      validador: validarNumeroTarjeta,
      mensajes: {
        requerido: 'El número de tarjeta es obligatorio',
        validador: 'Número de tarjeta inválido'
      }
    },
    nombreTitular: {
      requerido: true,
      validador: validarNombreTitular,
      mensajes: {
        requerido: 'El nombre del titular es obligatorio',
        validador: 'Por favor ingresa el nombre completo del titular'
      }
    },
    fechaExpiracion: {
      requerido: true,
      validador: validarFechaExpiracion,
      mensajes: {
        requerido: 'La fecha de expiración es obligatoria',
        validador: 'Formato de fecha inválido (MM/AA)'
      }
    },
    cvv: {
      requerido: true,
      validador: validarCVV,
      mensajes: {
        requerido: 'El CVV es obligatorio',
        validador: 'CVV inválido'
      }
    },
    predeterminada: {}
  };
  
  // Valores iniciales del formulario
  const valoresIniciales = {
    tipo: '',
    numeroTarjeta: '',
    nombreTitular: '',
    fechaExpiracion: '',
    cvv: '',
    predeterminada: false
  };
  
  // Usar el hook de formulario
  const {
    formulario,
    errores,
    cargando,
    exito,
    errorGlobal,
    formularioValido,
    validarCampo,
    validarFormulario,
    alPerderFoco,
    resetearFormulario,
    enviarFormulario
  } = useFormulario(esquemaValidacion, valoresIniciales);
  
  // Función para seleccionar tipo de tarjeta
  const seleccionarTipoTarjeta = (tipo) => {
  formulario.tipo = tipo;
  // Elimina el error de tipo si existe
  errores.tipo = '';
  console.log('Tipo de tarjeta seleccionado:', tipo);
  
  // Validar inmediatamente después de seleccionar
  validarCampo('tipo');
  
  // Re-validar campos que dependen del tipo
  if (formulario.numeroTarjeta) validarCampo('numeroTarjeta');
  if (formulario.cvv) validarCampo('cvv');
};
  

  
  // Formatear número de tarjeta al estilo 1234 5678 9012 3456
  watch(() => formulario.numeroTarjeta, (nuevoValor) => {
    if (!nuevoValor) return;
    
    // Eliminar caracteres no numéricos
    let numeroLimpio = nuevoValor.replace(/\D/g, '');
    
    // Limitar a 16 dígitos (19 para algunos tipos)
    const maxLength = formulario.tipo === 'amex' ? 15 : 16;
    numeroLimpio = numeroLimpio.substring(0, maxLength);
    
    // Formatear con espacios cada 4 dígitos
    let formateado;
    if (formulario.tipo === 'amex') {
      // American Express: 4-6-5
      formateado = numeroLimpio.replace(/(\d{4})(\d{6})(\d{0,5})/, '$1 $2 $3').trim();
    } else {
      // Visa, Mastercard y genérico: 4-4-4-4
      formateado = numeroLimpio.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, '$1 $2 $3 $4').trim();
    }
    
    // Solo actualizar si es diferente para evitar un ciclo infinito
    if (formateado !== nuevoValor) {
      formulario.numeroTarjeta = formateado;
    }
  });
  
  // Formatear fecha de expiración al estilo MM/AA
  watch(() => formulario.fechaExpiracion, (nuevoValor) => {
    if (!nuevoValor) return;
    
    // Eliminar caracteres no numéricos
    let numeroLimpio = nuevoValor.replace(/\D/g, '');
    
    // Limitar a 4 dígitos
    numeroLimpio = numeroLimpio.substring(0, 4);
    
    // Formatear como MM/AA
    let formateado = numeroLimpio;
    if (numeroLimpio.length > 2) {
      formateado = `${numeroLimpio.substring(0, 2)}/${numeroLimpio.substring(2)}`;
    }
    
    // Solo actualizar si es diferente para evitar un ciclo infinito
    if (formateado !== nuevoValor) {
      formulario.fechaExpiracion = formateado;
    }
  });
  watch(() => formularioValido.value, (newVal) => {
  console.log('Estado formularioValido cambió a:', newVal);
});

const manejarSubmit = (event) => {
  event.preventDefault();
  console.log('Formulario enviado, validando...');
  
  // Validación manual de todos los campos
  Object.keys(formulario).forEach(campo => {
    if (esquemaValidacion[campo] && esquemaValidacion[campo].requerido) {
      validarCampo(campo);
    }
    console.log(`Campo ${campo}: ${formulario[campo]}, error: ${errores[campo]}`);
  });
  
  // Verificar si el formulario es válido antes de enviar
  if (validarFormulario()) {
    console.log('Formulario válido, procediendo a guardar...');
    guardarMetodoPago();
  } else {
    console.log('Formulario inválido, no se puede guardar.');
    console.log('Errores:', errores);
  }
};

  // Función para guardar el método de pago
  const guardarMetodoPago = async () => {
  try {
    console.log('Iniciando guardado del método de pago');
    console.log('Datos del formulario:', formulario);
    
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Preparar los datos para enviar
    const datosTarjeta = {
      ...formulario,
      numeroVisible: formulario.numeroTarjeta.replace(/\s/g, '').slice(-4),
      id: props.modo === 'editar' ? props.metodoPago.id : Date.now().toString(),
    };
    
    console.log('Emitiendo evento guardar con datos:', datosTarjeta);
    emit('guardar', datosTarjeta);
    console.log('Evento emitido');
    
    return true;
  } catch (error) {
    console.error('Error al guardar:', error);
    throw new Error('Error al guardar el método de pago. Por favor, intenta nuevamente.');
  }
};
  
  // Función para cancelar el formulario
  const cancelar = () => {
    resetearFormulario();
    emit('cancelar');
  };
  
  // Función para manejar la validación de un campo
  const validacionCampo = (campo, esValido) => {
    console.log(`Campo ${campo} validado: ${esValido}`);
  };
  
  // Al montar el componente, si es modo editar, cargamos los datos del método de pago
  onMounted(() => {
    if (props.modo === 'editar' && props.metodoPago) {
      // Asignar valores del método de pago al formulario
      Object.keys(formulario).forEach(key => {
        if (key in props.metodoPago) {
          formulario[key] = props.metodoPago[key];
        }
      });
    }
  });
  </script>