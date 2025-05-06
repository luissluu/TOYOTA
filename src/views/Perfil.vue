<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-2">
      <div class="bg-gray-800 md:col-span-2">
        <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Mi Perfil</h2>
          
          <div class="mt-6 text-white">
            <!-- Información del perfil -->
            <div class="mt-8">
              <div class="mb-8">
                <div class="bg-gray-700 rounded-lg p-6">
                  <div class="flex flex-col md:flex-row md:items-center">
                    <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div class="w-24 h-24 bg-gray-500 rounded-full overflow-hidden">
                        <img :src="usuario.foto || 'https://randomuser.me/api/portraits/men/68.jpg'" alt="Foto de perfil" class="w-full h-full object-cover">
                      </div>
                      <button class="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 w-full">
                        Cambiar foto
                      </button>
                    </div>
                    
                    <!-- Aquí usamos nuestro formulario de perfil -->
                    <div class="flex-grow">
                      <FormularioPerfil 
                        :usuario="usuario" 
                        @guardar="guardarPerfil" 
                        @cancelar="cancelarEdicion"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Historial de actividad -->
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
import { ref, onMounted } from 'vue';
import FormularioPerfil from '../components/perfil/FormularioPerfil.vue';

export default {
  name: 'PerfilPage',
  components: {
    FormularioPerfil
  },
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
    
    // En una aplicación real, cargarías los datos del usuario desde tu API
    const cargarUsuario = async () => {
      try {
        // Simulación de carga de datos
        // const response = await axios.get('/api/usuario');
        // usuario.value = response.data;
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };
    
    // Guardar cambios del perfil
    const guardarPerfil = async (datosActualizados) => {
      try {
        // Simulación de guardado
        // En una aplicación real, harías una llamada a tu API
        // await axios.put('/api/usuario', datosActualizados);
        
        // Actualizar datos locales
        usuario.value = { ...usuario.value, ...datosActualizados };
        
        alert('Perfil actualizado correctamente');
      } catch (error) {
        console.error('Error al guardar el perfil:', error);
        alert('Ocurrió un error al guardar los cambios. Por favor, intenta nuevamente.');
      }
    };
    
    const cancelarEdicion = () => {
      // Si es necesario realizar alguna acción al cancelar
      console.log('Edición cancelada');
    };
    
    // Cargar datos al montar el componente
    onMounted(() => {
      cargarUsuario();
    });
    
    return {
      usuario,
      guardarPerfil,
      cancelarEdicion
    };
  }
};
</script>