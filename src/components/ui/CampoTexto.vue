// ===== CampoTexto.vue =====
// Ubicación: /src/components/ui/CampoTexto.vue

<template>
  <div class="w-full">
    <label 
      v-if="label" 
      :for="id" 
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
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
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :required="required"
        :disabled="disabled"
        class="w-full rounded-md border py-2 px-4 text-gray-900 placeholder-gray-500 
               focus:border-[#EB0A1E] focus:outline-none focus:ring-1 focus:ring-[#EB0A1E]
               disabled:opacity-50 disabled:bg-gray-50"
        :class="[
          $slots.icono ? 'pl-10' : 'pl-4',
          error ? 'border-[#EB0A1E] focus:border-[#EB0A1E] focus:ring-[#EB0A1E]' : 'border-gray-300',
          customClass
        ]"
      />
    </div>
    <p v-if="error" class="mt-1 text-sm text-[#EB0A1E]">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
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
  }
});

defineEmits(['update:modelValue']);
</script>