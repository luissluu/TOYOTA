<!-- src/views/admin/AdminPerfil.vue -->
<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <!-- Encabezado -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold tracking-tight text-white">Perfil de Administrador</h2>
            <p class="text-gray-400 mt-2">Gestiona tu información personal y preferencias</p>
          </div>
          
          <div class="bg-gray-700 rounded-lg p-6">
            <div class="flex flex-col md:flex-row md:items-start">
              <!-- Foto de perfil -->
              <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div class="w-32 h-32 bg-gray-600 rounded-full overflow-hidden">
                  <img :src="perfil.foto" alt="Foto de perfil" class="w-full h-full object-cover">
                </div>
                <button 
                  @click="cambiarFoto" 
                  class="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Cambiar Foto
                </button>
              </div>
              
              <!-- Información del perfil -->
              <div class="flex-grow">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                    <input 
                      v-model="perfil.nombre"
                      type="text" 
                      class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Apellido</label>
                    <input 
                      v-model="perfil.apellido"
                      type="text" 
                      class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input 
                      v-model="perfil.email"
                      type="email" 
                      class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Teléfono</label>
                    <input 
                      v-model="perfil.telefono"
                      type="tel" 
                      class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                </div>
                
                <div class="mt-6 flex justify-end space-x-4">
                  <button 
                    @click="restaurarPerfil"
                    class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                  >
                    Restaurar
                  </button>
                  <button 
                    @click="guardarPerfil"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                  >
                    <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'AdminPerfil',
  setup() {
    const perfil = ref({
      foto: 'https://randomuser.me/api/portraits/men/1.jpg',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@toyota.com',
      telefono: '+52 55 1234 5678',
      cargo: 'Administrador del Sistema',
      departamento: 'Administración',
      biografia: 'Administrador principal del sistema de gestión de taller Toyota. Experiencia en gestión de servicios automotrices y sistemas de información.'
    });

    const cambiarFoto = () => {
      // Implementar lógica para cambiar foto
      console.log('Cambiando foto de perfil');
    };

    const guardarPerfil = () => {
      // Implementar guardado de perfil
      console.log('Guardando perfil:', perfil.value);
    };

    const restaurarPerfil = () => {
      // Implementar restauración de perfil
      console.log('Restaurando perfil');
    };

    return {
      perfil,
      cambiarFoto,
      guardarPerfil,
      restaurarPerfil
    };
  }
};
</script> 