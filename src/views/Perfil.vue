<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-2">
      <div class="bg-gray-800 md:col-span-2">
        <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Mi Perfil</h2>
          
          <div class="mt-6 text-white">
            <!-- Información del perfil (solo visualización) -->
            <div class="mt-8">
              <div class="mb-8">
                <div class="bg-gray-700 rounded-lg p-6">
                  <div class="flex flex-col md:flex-row md:items-center">
                    <!-- Foto de perfil -->
                    <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div class="w-24 h-24 bg-gray-500 rounded-full overflow-hidden">
                        <img :src="usuario.foto" alt="Foto de perfil" class="w-full h-full object-cover">
                      </div>
                    </div>
                    
                    <!-- Datos del perfil (solo visualización) -->
                    <div class="flex-grow">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 class="text-sm font-medium text-gray-400">Nombre</h3>
                          <p class="text-white">{{ usuario.nombre }} {{ usuario.apellido }}</p>
                        </div>
                        <div>
                          <h3 class="text-sm font-medium text-gray-400">Correo Electrónico</h3>
                          <p class="text-white">{{ usuario.email }}</p>
                        </div>
                        <div>
                          <h3 class="text-sm font-medium text-gray-400">Teléfono</h3>
                          <p class="text-white">{{ usuario.telefono }}</p>
                        </div>
                        <div>
                          <h3 class="text-sm font-medium text-gray-400">Fecha de Nacimiento</h3>
                          <p class="text-white">{{ formatearFecha(usuario.fechaNacimiento) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Historial de actividad (esto lo mantienes igual) -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Actividad reciente</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                  <div class="space-y-4">
                    <div class="bg-gray-800 p-4 rounded-lg">
                      <div class="flex justify-between items-center">
                        <div>
                          <h4 class="text-white font-medium">Servicio de cambio de aceite</h4>
                          <p class="text-gray-400 text-sm">Completado - 26 abril, 2025</p>
                        </div>
                        <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm">Completado</span>
                      </div>
                    </div>
                    
                    <div class="bg-gray-800 p-4 rounded-lg">
                      <div class="flex justify-between items-center">
                        <div>
                          <h4 class="text-white font-medium">Cambio de filtro de aire</h4>
                          <p class="text-gray-400 text-sm">En proceso - 3 mayo, 2025</p>
                        </div>
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm">En proceso</span>
                      </div>
                    </div>
                    
                    <div class="bg-gray-800 p-4 rounded-lg">
                      <div class="flex justify-between items-center">
                        <div>
                          <h4 class="text-white font-medium">Alineación y balanceo</h4>
                          <p class="text-gray-400 text-sm">Programado - 10 mayo, 2025</p>
                        </div>
                        <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm">Pendiente</span>
                      </div>
                    </div>
                  </div>
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
  name: 'PerfilPage',
  setup() {
    // Estado del usuario
    const usuario = ref({
      id: '1',
      nombre: 'Luis',
      apellido: 'González',
      email: 'luis.gonzalez@ejemplo.com',
      telefono: '5512345678',
      fechaNacimiento: '1985-06-15',
      foto: 'https://randomuser.me/api/portraits/men/68.jpg'
    });
    
    // Función para formatear la fecha
    const formatearFecha = (fecha) => {
      if (!fecha) return '';
      
      const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(fecha).toLocaleDateString('es-ES', opciones);
    };
    
    return {
      usuario,
      formatearFecha
    };
  }
};
</script>