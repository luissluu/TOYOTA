<!-- src/components/configuracion/FormularioVehiculo.vue -->
<template>
  <div class="bg-gray-700 rounded-lg p-6">
    <h4 class="text-lg font-medium text-white mb-4">{{ modo === 'editar' ? 'Editar Vehículo' : 'Añadir Nuevo Vehículo' }}</h4>
    
    <form @submit.prevent="manejarSubmit" class="space-y-4">
      <!-- Marca -->
      <CampoValidado
        id="marca"
        v-model="formulario.marca"
        :error="errores.marca"
        @update:error="errores.marca = $event"
        @validacion="validacionCampo('marca', $event)"
        @blur="alPerderFoco('marca')"
        label="Marca"
        placeholder="Ej: Toyota"
        required
        soloLetras
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
          </svg>
        </template>
      </CampoValidado>

      <!-- Modelo -->
      <CampoValidado
        id="modelo"
        v-model="formulario.modelo"
        :error="errores.modelo"
        @update:error="errores.modelo = $event"
        @validacion="validacionCampo('modelo', $event)"
        @blur="alPerderFoco('modelo')"
        label="Modelo"
        placeholder="Ej: Corolla"
        required
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 001-1v-3.5a1 1 0 00-.293-.707l-2-2A1 1 0 0012 7h-1V5a1 1 0 00-1-1H3z" />
          </svg>
        </template>
      </CampoValidado>

      <!-- Año -->
      <CampoValidado
        id="ano"
        v-model="formulario.ano"
        :error="errores.ano"
        @update:error="errores.ano = $event"
        @validacion="validacionCampo('ano', $event)"
        @blur="alPerderFoco('ano')"
        label="Año"
        placeholder="Ej: 2023"
        required
        type="number"
        soloNumeros
        :validator="validarAno"
        errorMessage="Por favor ingresa un año válido (1900-2025)"
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
        </template>
      </CampoValidado>

      <!-- VIN -->
      <CampoValidado
        id="vin"
        v-model="formulario.vin"
        :error="errores.vin"
        @update:error="errores.vin = $event"
        @validacion="validacionCampo('vin', $event)"
        @blur="alPerderFoco('vin')"
        label="VIN (Número de Identificación del Vehículo)"
        placeholder="Ej: 1HGCM82633A123456"
        :validator="validarVIN"
        errorMessage="El VIN debe tener 17 caracteres alfanuméricos"
        ayuda="El VIN se encuentra en la tarjeta de circulación o en la base del parabrisas"
        maxlength="17"
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
          </svg>
        </template>
      </CampoValidado>

      <!-- Color -->
      <CampoValidado
        id="color"
        v-model="formulario.color"
        :error="errores.color"
        @update:error="errores.color = $event"
        @validacion="validacionCampo('color', $event)"
        @blur="alPerderFoco('color')"
        label="Color"
        placeholder="Ej: Blanco"
        soloLetras
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd" />
          </svg>
        </template>
      </CampoValidado>

      <!-- Placa -->
      <CampoValidado
        id="placa"
        v-model="formulario.placa"
        :error="errores.placa"
        @update:error="errores.placa = $event"
        @validacion="validacionCampo('placa', $event)"
        @blur="alPerderFoco('placa')"
        label="Placa"
        placeholder="Ej: ABC-123"
        :validator="validarPlaca"
        errorMessage="Formato de placa no válido"
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" />
          </svg>
        </template>
      </CampoValidado>

      <!-- Kilometraje -->
      <CampoValidado
        id="kilometraje"
        v-model="formulario.kilometraje"
        :error="errores.kilometraje"
        @update:error="errores.kilometraje = $event"
        @validacion="validacionCampo('kilometraje', $event)"
        @blur="alPerderFoco('kilometraje')"
        label="Kilometraje"
        placeholder="Ej: 15000"
        type="number"
        soloNumeros
        :validator="validarKilometraje"
        errorMessage="Por favor ingresa un kilometraje válido"
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
          </svg>
        </template>
      </CampoValidado>

      <!-- Vehículo Principal -->
      <div class="flex items-center space-x-2 px-3 py-2 bg-gray-600 rounded-md">
        <input
          id="principal"
          v-model="formulario.principal"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-500 text-blue-600 focus:ring-blue-500"
        />
        <label for="principal" class="text-white text-sm">
          Establecer como vehículo principal
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
import { validarSoloLetras, validarVIN } from '../../utils/validaciones';
import { useFormulario } from '../../composables/useFormulario';

// Define las funciones de validación antes de usarlas en esquemaValidacion
const validarAno = (valor) => {
  if (!valor) return true; // Si está vacío, lo manejará la validación de requerido
  
  const ano = parseInt(valor, 10);
  const anoActual = new Date().getFullYear();
  return !isNaN(ano) && ano >= 1900 && ano <= anoActual;
};

const validarPlaca = (valor) => {
  if (!valor) return true; // Si está vacío, es válido (no es obligatorio)
  
  // Formato típico de placas mexicanas: 3 letras seguidas de 3 números
  // O también: 3 letras, guión, 3 números
  // También aceptamos los formatos anteriores
  const patron = /^[A-Z]{2,3}[-\s]?[0-9]{2,4}$/i;
  return patron.test(valor);
};

const validarKilometraje = (valor) => {
  if (!valor) return true; // Si está vacío, es válido (no es obligatorio)
  
  const km = parseInt(valor, 10);
  return !isNaN(km) && km >= 0 && km <= 1000000; // Valor máximo razonable
};

const props = defineProps({
  vehiculo: {
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

// Esquema de validación del formulario
const esquemaValidacion = {
  marca: {
    requerido: true,
    validador: validarSoloLetras,
    mensajes: {
      requerido: 'La marca es obligatoria',
      validador: 'Por favor ingresa una marca válida (solo letras)'
    }
  },
  modelo: {
    requerido: true,
    mensajes: {
      requerido: 'El modelo es obligatorio'
    }
  },
  ano: {
    requerido: true,
    validador: validarAno,
    mensajes: {
      requerido: 'El año es obligatorio',
      validador: 'Por favor ingresa un año válido (1900-2025)'
    }
  },
  vin: {
    validador: validarVIN,
    mensajes: {
      validador: 'El VIN debe tener 17 caracteres alfanuméricos'
    }
  },
  color: {
    validador: validarSoloLetras,
    mensajes: {
      validador: 'Por favor ingresa un color válido (solo letras)'
    }
  },
  placa: {
    validador: validarPlaca,
    mensajes: {
      validador: 'Formato de placa no válido'
    }
  },
  kilometraje: {
    validador: validarKilometraje,
    mensajes: {
      validador: 'Por favor ingresa un kilometraje válido'
    }
  },
  principal: {}
};

// Valores iniciales del formulario
const valoresIniciales = {
  marca: '',
  modelo: '',
  ano: '',
  vin: '',
  color: '',
  placa: '',
  kilometraje: '',
  principal: false
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

// Monitor de estado para depuración
watch(() => formularioValido.value, (newVal) => {
  console.log('Estado de formularioValido:', newVal);
});

// Función para guardar el vehículo
const guardarVehiculo = async () => {
  try {
    console.log('Iniciando guardado del vehículo...');
    console.log('Datos del vehículo a guardar:', formulario);
    
    // Simular guardado (en un entorno real, sería una petición al backend)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Preparar el objeto a emitir
    const vehiculoData = {
      ...formulario,
      id: props.modo === 'editar' ? props.vehiculo.id : Date.now().toString(), // Generar ID para nuevos vehículos
    };
    
    console.log('Emitiendo evento guardar con datos:', vehiculoData);
    
    // Emitir evento con los datos del vehículo
    emit('guardar', vehiculoData);
    
    console.log('Evento emitido correctamente');
    return true;
  } catch (error) {
    console.error('Error al guardar el vehículo:', error);
    throw new Error('Error al guardar el vehículo. Por favor, intenta nuevamente.');
  }
};

// Función para cancelar el formulario
const cancelar = () => {
  console.log('Cancelando formulario...');
  resetearFormulario();
  emit('cancelar');
};

// Función para manejar la validación de un campo
const validacionCampo = (campo, esValido) => {
  console.log(`Campo ${campo} validado: ${esValido}`);
};

// Función para manejar el submit del formulario
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
    guardarVehiculo();
  } else {
    console.log('Formulario inválido, no se puede guardar.');
  }
};

// Al montar el componente, si es modo editar, cargamos los datos del vehículo
onMounted(() => {
  console.log('FormularioVehiculo montado, modo:', props.modo);
  console.log('Vehiculo recibido:', props.vehiculo);
  
  if (props.modo === 'editar' && props.vehiculo) {
    // Asignar valores del vehículo al formulario
    Object.keys(formulario).forEach(key => {
      if (key in props.vehiculo) {
        formulario[key] = props.vehiculo[key];
      }
    });
    console.log('Formulario inicializado con datos del vehículo:', formulario);
  }
});
</script>