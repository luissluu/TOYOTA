<template>
    <div class="w-full">
      <label 
        v-if="label" 
        :for="id" 
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </label>
      <div class="relative">
        <div 
          v-if="$slots.icono" 
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500"
        >
          <slot name="icono"></slot>
        </div>
        
        <input
          :id="id"
          :type="type"
          :value="modelValue"
          @input="validarInput"
          @blur="validarCampo"
          :placeholder="placeholder"
          :autocomplete="autocomplete"
          :required="required"
          :disabled="disabled"
          :maxlength="maxlength"
          class="w-full rounded-md border py-2 px-4 text-gray-900 placeholder-gray-500 
                 focus:border-[#EB0A1E] focus:outline-none focus:ring-1 focus:ring-[#EB0A1E]
                 disabled:opacity-50 disabled:bg-gray-50"
          :class="[
            $slots.icono ? 'pl-10' : 'pl-4',
            error ? 'border-[#EB0A1E] focus:border-[#EB0A1E] focus:ring-[#EB0A1E]' : 'border-gray-300',
            customClass
          ]"
        />
        
        <div 
          v-if="$slots.iconoDerecha" 
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <slot name="iconoDerecha"></slot>
        </div>
      </div>
      
      <!-- Mensaje de error -->
      <p v-if="error" class="mt-1 text-sm text-[#EB0A1E]">{{ error }}</p>
      
      <!-- Mensaje de ayuda -->
      <p v-else-if="ayuda" class="mt-1 text-xs text-gray-500">{{ ayuda }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    customClass: {
      type: String,
      default: ''
    },
    validator: {
      type: Function,
      default: null
    },
    errorMessage: {
      type: String,
      default: 'Valor inválido'
    },
    maxlength: {
      type: Number,
      default: null
    },
    ayuda: {
      type: String,
      default: ''
    },
    soloNumeros: {
      type: Boolean,
      default: false
    },
    soloLetras: {
      type: Boolean,
      default: false
    },
    validarAlSalir: {
      type: Boolean,
      default: true
    },
    validarAlEscribir: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['update:modelValue', 'update:error', 'validacion', 'blur']);
  
  // Función para validar la entrada
  const validarInput = (event) => {
    const valor = event.target.value;
    
    // Si es solo números, filtra caracteres no numéricos
    if (props.soloNumeros) {
      // Permite solo números y puntos para decimales según el tipo
      const valorFiltrado = props.type === 'number' || props.type === 'tel' 
        ? valor.replace(/[^\d.]/g, '')
        : valor.replace(/\D/g, '');
      
      // Actualiza el valor si cambió
      if (valorFiltrado !== valor) {
        event.target.value = valorFiltrado;
        emit('update:modelValue', valorFiltrado);
        return;
      }
    }
    
    // Si es solo letras, filtra caracteres no alfabéticos
    if (props.soloLetras) {
      const valorFiltrado = valor.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
      
      // Actualiza el valor si cambió
      if (valorFiltrado !== valor) {
        event.target.value = valorFiltrado;
        emit('update:modelValue', valorFiltrado);
        return;
      }
    }
    
    // Emite el valor actualizado
    emit('update:modelValue', valor);
    
    // Valida si está configurado para validar mientras se escribe
    if (props.validarAlEscribir && props.validator) {
      const esValido = props.validator(valor);
      if (!esValido) {
        emit('update:error', props.errorMessage);
        emit('validacion', false);
      } else {
        emit('update:error', '');
        emit('validacion', true);
      }
    }
  };
  
  // Función para validar al salir del campo
  const validarCampo = (event) => {
    emit('blur', event);
    
    if (!props.validarAlSalir || !props.validator) return;
    
    const valor = event.target.value;
    const esValido = props.validator(valor);
    
    if (!esValido) {
      emit('update:error', props.errorMessage);
      emit('validacion', false);
    } else {
      emit('update:error', '');
      emit('validacion', true);
    }
  };
  
  // Observa cambios en el valor del modelo para validar
  watch(() => props.modelValue, (nuevoValor) => {
    if (props.validarAlEscribir && props.validator) {
      const esValido = props.validator(nuevoValor);
      if (!esValido) {
        emit('update:error', props.errorMessage);
        emit('validacion', false);
      } else {
        emit('update:error', '');
        emit('validacion', true);
      }
    }
  });
  </script>