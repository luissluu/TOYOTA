<template>
    <div class="bg-gray-700 rounded-lg p-6">
      <!-- Vista de solo lectura -->
      <div v-if="!modoEdicion">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
            <p class="bg-gray-600 px-3 py-2 rounded-md text-white">{{ usuario.nombre }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Apellido</label>
            <p class="bg-gray-600 px-3 py-2 rounded-md text-white">{{ usuario.apellido }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <p class="bg-gray-600 px-3 py-2 rounded-md text-white">{{ usuario.email }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
            <p class="bg-gray-600 px-3 py-2 rounded-md text-white">{{ usuario.telefono || 'No especificado' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Fecha de Nacimiento</label>
            <p class="bg-gray-600 px-3 py-2 rounded-md text-white">{{ formatearFecha(usuario.fechaNacimiento) || 'No especificada' }}</p>
          </div>
        </div>
        <div class="mt-4">
          <button 
            @click="activarModoEdicion" 
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Editar Perfil
          </button>
        </div>
      </div>
  
      <!-- Vista de formulario editable -->
      <div v-else>
        <form @submit.prevent="manejarSubmit" class="space-y-4">
          <!-- Nombre -->
          <CampoValidado
            id="nombre"
            v-model="formulario.nombre"
            :error="errores.nombre"
            @update:error="errores.nombre = $event"
            @validacion="validacionCampo('nombre', $event)"
            @blur="alPerderFoco('nombre')"
            label="Nombre"
            placeholder="Tu nombre"
            required
            soloLetras
            :validator="validarSoloLetras"
            errorMessage="Por favor ingresa un nombre válido (solo letras)"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Apellido -->
          <CampoValidado
            id="apellido"
            v-model="formulario.apellido"
            :error="errores.apellido"
            @update:error="errores.apellido = $event"
            @validacion="validacionCampo('apellido', $event)"
            @blur="alPerderFoco('apellido')"
            label="Apellido"
            placeholder="Tu apellido"
            required
            soloLetras
            :validator="validarSoloLetras"
            errorMessage="Por favor ingresa un apellido válido (solo letras)"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Email -->
          <CampoValidado
            id="email"
            v-model="formulario.email"
            :error="errores.email"
            @update:error="errores.email = $event"
            @validacion="validacionCampo('email', $event)"
            @blur="alPerderFoco('email')"
            label="Correo Electrónico"
            placeholder="correo@ejemplo.com"
            required
            :validator="validarEmail"
            errorMessage="Por favor ingresa un correo electrónico válido"
            autocomplete="email"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Teléfono -->
          <CampoValidado
            id="telefono"
            v-model="formulario.telefono"
            :error="errores.telefono"
            @update:error="errores.telefono = $event"
            @validacion="validacionCampo('telefono', $event)"
            @blur="alPerderFoco('telefono')"
            label="Teléfono"
            placeholder="(123) 456-7890"
            type="tel"
            soloNumeros
            :validator="validarTelefono"
            errorMessage="Por favor ingresa un número de teléfono válido"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Fecha de Nacimiento -->
          <CampoValidado
            id="fechaNacimiento"
            v-model="formulario.fechaNacimiento"
            :error="errores.fechaNacimiento"
            @update:error="errores.fechaNacimiento = $event"
            @validacion="validacionCampo('fechaNacimiento', $event)"
            @blur="alPerderFoco('fechaNacimiento')"
            label="Fecha de Nacimiento"
            type="date"
            :validator="validarFechaNacimiento"
            errorMessage="Por favor ingresa una fecha de nacimiento válida"
          >
            <template #icono>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
            </template>
          </CampoValidado>
    
          <!-- Botones de acción -->
          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="cancelarEdicion"
              class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
            <button
              type="button"
              @click="guardarDirectamente"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
              :disabled="cargando"
            >
              <svg v-if="cargando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ cargando ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  import CampoValidado from '../ui/CampoValidado.vue';
  import { validarSoloLetras, validarEmail, validarTelefono } from '../../utils/validaciones';
  import { useFormulario } from '../../composables/useFormulario';
  
  const props = defineProps({
    usuario: {
      type: Object,
      default: () => ({})
    }
  });
  
  const emit = defineEmits(['guardar', 'cancelar']);
  
  // Estado para controlar el modo de edición
  const modoEdicion = ref(false);
  
  // Validación para la fecha de nacimiento
  const validarFechaNacimiento = (valor) => {
    if (!valor) return true; // Si está vacío, es válido (no es obligatorio)
    
    const fechaNac = new Date(valor);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    
    // Verificar que la fecha sea válida y que el usuario sea mayor de 18 años
    return !isNaN(fechaNac.getTime()) && 
           (edad > 18 || (edad === 18 && hoy.getMonth() >= fechaNac.getMonth() && hoy.getDate() >= fechaNac.getDate()));
  };
  
  // Esquema de validación del formulario
  const esquemaValidacion = {
    nombre: {
      requerido: true,
      validador: validarSoloLetras,
      mensajes: {
        requerido: 'El nombre es obligatorio',
        validador: 'Por favor ingresa un nombre válido (solo letras)'
      }
    },
    apellido: {
      requerido: true,
      validador: validarSoloLetras,
      mensajes: {
        requerido: 'El apellido es obligatorio',
        validador: 'Por favor ingresa un apellido válido (solo letras)'
      }
    },
    email: {
      requerido: true,
      validador: validarEmail,
      mensajes: {
        requerido: 'El correo electrónico es obligatorio',
        validador: 'Por favor ingresa un correo electrónico válido'
      }
    },
    telefono: {
      validador: validarTelefono,
      mensajes: {
        validador: 'Por favor ingresa un número telefónico válido'
      }
    },
    fechaNacimiento: {
      validador: validarFechaNacimiento,
      mensajes: {
        validador: 'Por favor ingresa una fecha de nacimiento válida'
      }
    }
  };
  
  // Valores iniciales del formulario
  const valoresIniciales = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fechaNacimiento: ''
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
  
  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    
    try {
      const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(fecha).toLocaleDateString('es-ES', opciones);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return fecha;
    }
  };
  
  // Función para activar el modo de edición
  const activarModoEdicion = () => {
    console.log("Activando modo edición");
    // Asegurarse de que los datos del formulario estén actualizados
    Object.keys(formulario).forEach(key => {
      if (key in props.usuario) {
        formulario[key] = props.usuario[key];
      }
    });
    modoEdicion.value = true;
  };
  
  // Función para manejar submit del formulario
  const manejarSubmit = (event) => {
    console.log("Formulario enviado");
    event.preventDefault();
    guardarDirectamente();
  };
  
  // Función para guardar directamente
  const guardarDirectamente = () => {
    console.log("Botón guardar presionado directamente");
    
    // Validación manual
    let esValido = true;
    
    // Validar campos requeridos
    if (!formulario.nombre) {
      errores.nombre = 'El nombre es obligatorio';
      esValido = false;
    }
    
    if (!formulario.apellido) {
      errores.apellido = 'El apellido es obligatorio';
      esValido = false;
    }
    
    if (!formulario.email) {
      errores.email = 'El correo electrónico es obligatorio';
      esValido = false;
    } else if (!validarEmail(formulario.email)) {
      errores.email = 'Por favor ingresa un correo electrónico válido';
      esValido = false;
    }
    
    // Si hay teléfono, validarlo
    if (formulario.telefono && !validarTelefono(formulario.telefono)) {
      errores.telefono = 'Por favor ingresa un número telefónico válido';
      esValido = false;
    }
    
    // Si hay fecha de nacimiento, validarla
    if (formulario.fechaNacimiento && !validarFechaNacimiento(formulario.fechaNacimiento)) {
      errores.fechaNacimiento = 'Por favor ingresa una fecha de nacimiento válida';
      esValido = false;
    }
    
    if (!esValido) {
      console.log("Formulario inválido, no se enviará");
      return;
    }
    
    console.log("Formulario válido, emitiendo evento guardar con datos:", formulario);
    
    // Iniciar carga
    cargando.value = true;
    
    // Simular un proceso de guardado
    setTimeout(() => {
      // Emitir evento con los datos
      emit('guardar', {
        ...formulario,
        id: props.usuario.id || Date.now().toString(),
      });
      
      // Terminar carga
      cargando.value = false;
      
      // Desactivar modo edición
      modoEdicion.value = false;
      
      console.log("Datos enviados y modo edición desactivado");
    }, 800);
  };
  
  // Función para cancelar la edición
  const cancelarEdicion = () => {
    console.log("Cancelando edición");
    modoEdicion.value = false;
    
    // Resetear el formulario a los valores originales
    Object.keys(formulario).forEach(key => {
      if (key in props.usuario) {
        formulario[key] = props.usuario[key];
      } else {
        formulario[key] = '';
      }
    });
    
    // Limpiar errores
    Object.keys(errores).forEach(key => {
      errores[key] = '';
    });
    
    emit('cancelar');
  };
  
  // Función para manejar la validación de un campo
  const validacionCampo = (campo, esValido) => {
    console.log(`Campo ${campo} validado: ${esValido}`);
  };
  
  // Al montar el componente, inicializamos los valores del formulario con los datos del usuario
  onMounted(() => {
    console.log("Componente FormularioPerfil montado, usuario:", props.usuario);
    
    if (props.usuario) {
      // Asignar valores del usuario al formulario
      Object.keys(formulario).forEach(key => {
        if (key in props.usuario) {
          formulario[key] = props.usuario[key];
        }
      });
    }
  });
  </script>