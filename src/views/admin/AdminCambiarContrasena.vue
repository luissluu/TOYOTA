<!-- src/views/admin/AdminCambiarContrasena.vue -->
<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <!-- Encabezado -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold tracking-tight text-white">Cambiar Contraseña</h2>
            <p class="text-gray-400 mt-2">Actualiza tu contraseña para mantener tu cuenta segura</p>
          </div>
          
          <div class="bg-gray-700 rounded-lg p-6">
            <form @submit.prevent="cambiarContrasena" class="max-w-md mx-auto">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Contraseña Actual</label>
                  <input 
                    v-model="formulario.contraseñaActual"
                    type="password" 
                    class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Nueva Contraseña</label>
                  <input 
                    v-model="formulario.nuevaContraseña"
                    type="password" 
                    class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                  <p class="mt-1 text-sm text-gray-400">La contraseña debe tener al menos 8 caracteres</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Confirmar Nueva Contraseña</label>
                  <input 
                    v-model="formulario.confirmarContraseña"
                    type="password" 
                    class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                </div>
                
                <div class="flex justify-end space-x-4">
                  <button 
                    type="button"
                    @click="limpiarFormulario"
                    class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                  >
                    <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Cambiar Contraseña
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'AdminCambiarContrasena',
  setup() {
    const formulario = ref({
      contraseñaActual: '',
      nuevaContraseña: '',
      confirmarContraseña: ''
    });

    const cambiarContrasena = () => {
      // Validar que las contraseñas coincidan
      if (formulario.value.nuevaContraseña !== formulario.value.confirmarContraseña) {
        alert('Las contraseñas no coinciden');
        return;
      }

      // Validar longitud mínima
      if (formulario.value.nuevaContraseña.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return;
      }

      // Implementar cambio de contraseña
      console.log('Cambiando contraseña:', formulario.value);
    };

    const limpiarFormulario = () => {
      formulario.value = {
        contraseñaActual: '',
        nuevaContraseña: '',
        confirmarContraseña: ''
      };
    };

    return {
      formulario,
      cambiarContrasena,
      limpiarFormulario
    };
  }
};
</script> 