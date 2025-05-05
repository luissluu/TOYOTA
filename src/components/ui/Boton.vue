// ===== Boton.vue =====
// Ubicación: /src/components/ui/Boton.vue

<template>
  <button
    :type="type"
    :disabled="disabled || cargando"
    class="inline-flex items-center justify-center rounded-md font-medium transition-colors 
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
           disabled:opacity-50 disabled:pointer-events-none"
    :class="[
      varianteEstilos,
      tamanoEstilos,
      anchoCompleto ? 'w-full' : '',
      customClass
    ]"
    v-bind="$attrs"
  >
    <svg
      v-if="cargando"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variante: {
    type: String,
    default: 'primario',
    validator: (value) => ['primario', 'secundario', 'contorno', 'texto'].includes(value)
  },
  tamano: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  anchoCompleto: {
    type: Boolean,
    default: false
  },
  cargando: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  }
});

// Estilos basados en la variante
const varianteEstilos = computed(() => {
  const estilos = {
    primario: 'bg-[#EB0A1E] text-white hover:bg-[#d00919] focus-visible:ring-[#EB0A1E]',
    secundario: 'bg-[#000000] text-white hover:bg-gray-800 focus-visible:ring-[#000000]',
    contorno: 'border border-[#EB0A1E] bg-transparent hover:bg-gray-50 text-[#EB0A1E]',
    texto: 'bg-transparent text-[#EB0A1E] hover:bg-gray-100'
  };
  
  return estilos[props.variante];
});

// Estilos basados en el tamaño
const tamanoEstilos = computed(() => {
  const estilos = {
    sm: 'text-sm h-8 px-3',
    md: 'text-sm h-10 py-2 px-4',
    lg: 'text-base h-12 py-2 px-6'
  };
  
  return estilos[props.tamano];
});
</script>