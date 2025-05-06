<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-2">
      <div class="bg-gray-800 md:col-span-2">
        <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Configuración</h2>
          
          <div class="mt-6 text-white">
            <!-- Secciones de configuración -->
            <div class="mt-8">
              <!-- Sección 1: Perfil -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Perfil de Usuario</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                  <div class="flex flex-col md:flex-row md:items-center">
                    <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div class="w-24 h-24 bg-gray-500 rounded-full overflow-hidden">
                        <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="Foto de perfil" class="w-full h-full object-cover">
                      </div>
                      <button class="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 w-full">Cambiar foto</button>
                    </div>
                    <div class="flex-grow">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                          <input type="text" value="Dhaiflaah" class="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-400 mb-1">Apellido</label>
                          <input type="text" value="Usuario" class="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
                          <input type="email" value="dhaiflaah@ejemplo.com" class="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
                          <input type="tel" value="+52 123 456 7890" class="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                      </div>
                      <div class="mt-4">
                        <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Guardar Cambios</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Sección 2: Vehículos -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Mis Vehículos</h3>
                
                <!-- Lista de vehículos existentes -->
                <div class="bg-gray-700 rounded-lg p-6 mb-4">
                  <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-medium text-white">Vehículos Registrados</h4>
                    <button 
                      @click="mostrarFormulario = true; modoFormulario = 'agregar'"
                      class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      + Añadir Vehículo
                    </button>
                  </div>
                  
                  <!-- Lista de vehículos -->
                  <div class="space-y-4">
                    <div 
                      v-for="vehiculo in vehiculos" 
                      :key="vehiculo.id" 
                      class="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                    >
                      <div>
                        <h5 class="text-white font-medium">{{ vehiculo.marca }} {{ vehiculo.modelo }} {{ vehiculo.ano }}</h5>
                        <p class="text-gray-400 text-sm">VIN: {{ vehiculo.vin || 'No especificado' }}</p>
                        <p v-if="vehiculo.principal" class="mt-1 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-sm inline-block">Principal</p>
                      </div>
                      <div class="flex mt-2 md:mt-0">
                        <button 
                          @click="editarVehiculo(vehiculo)" 
                          class="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md mr-2"
                        >
                          Editar
                        </button>
                        <button 
                          @click="eliminarVehiculo(vehiculo.id)" 
                          class="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    
                    <!-- Mensaje si no hay vehículos -->
                    <div v-if="vehiculos.length === 0" class="text-center text-gray-400 py-4">
                      No tienes vehículos registrados.
                    </div>
                  </div>
                </div>
                
                <!-- Formulario de vehículo (modal) -->
                <div v-if="mostrarFormulario" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div class="w-full max-w-2xl">
                    <FormularioVehiculo 
                      :vehiculo="vehiculoEditando" 
                      :modo="modoFormulario" 
                      @guardar="guardarVehiculo" 
                      @cancelar="cancelarFormulario"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Sección 3: Preferencias de la aplicación -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Preferencias de la Aplicación</h3>
                <div class="bg-gray-700 rounded-lg p-6 space-y-4">
                  <!-- Opción 1: Notificaciones -->
                  <div class="flex justify-between items-center">
                    <div>
                      <h4 class="text-white font-medium">Notificaciones</h4>
                      <p class="text-gray-400 text-sm">Recibe notificaciones de la aplicación</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <!-- Opción 2: Recordatorios de servicio -->
                  <div class="flex justify-between items-center">
                    <div>
                      <h4 class="text-white font-medium">Recordatorios de servicio</h4>
                      <p class="text-gray-400 text-sm">Recibe alertas sobre mantenimientos programados</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" class="sr-only peer" checked>
                      <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- Sección 4: Métodos de pago -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Métodos de Pago</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                  <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-medium text-white">Tarjetas Guardadas</h4>
                    <button class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">+ Añadir Tarjeta</button>
                  </div>
                  
                  <!-- Lista de tarjetas -->
                  <div class="space-y-4">
                    <!-- Tarjeta 1 -->
                    <div class="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div class="flex items-center">
                        <svg class="w-10 h-10 mr-3" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="40" height="40" rx="4" fill="#1434CB" />
                          <path d="M14.5 24.5H25.5V28H14.5V24.5Z" fill="#F7B600" />
                          <path d="M14.5 12H25.5V20.5H14.5V12Z" fill="#FFFFFF" />
                        </svg>
                        <div>
                          <h5 class="text-white font-medium">Visa terminada en 4567</h5>
                          <p class="text-gray-400 text-sm">Expiración: 05/28</p>
                        </div>
                      </div>
                      <div class="flex mt-2 md:mt-0">
                        <button class="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md mr-2">Editar</button>
                        <button class="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md">Eliminar</button>
                      </div>
                    </div>
                    
                    <!-- Tarjeta 2 -->
                    <div class="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div class="flex items-center">
                        <svg class="w-10 h-10 mr-3" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="40" height="40" rx="4" fill="#EB001B" />
                          <circle cx="16" cy="20" r="8" fill="#FF5F00" />
                          <circle cx="24" cy="20" r="8" fill="#F79E1B" />
                        </svg>
                        <div>
                          <h5 class="text-white font-medium">Mastercard terminada en 8901</h5>
                          <p class="text-gray-400 text-sm">Expiración: 11/27</p>
                        </div>
                      </div>
                      <div class="flex mt-2 md:mt-0">
                        <button class="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md mr-2">Editar</button>
                        <button class="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md">Eliminar</button>
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
import { ref, reactive, onMounted } from 'vue';
import FormularioVehiculo from '../components/configuracion/FormularioVehiculo.vue';

export default {
  name: 'ConfiguracionPage',
  components: {
    FormularioVehiculo
  },
  setup() {
    // Estado
    const vehiculos = ref([
      {
        id: '1',
        marca: 'Toyota',
        modelo: 'Corolla',
        ano: '2020',
        vin: '1NXBR32E94Z123456',
        color: 'Blanco',
        placa: 'ABC-123',
        kilometraje: '25000',
        principal: true
      },
      {
        id: '2',
        marca: 'Honda',
        modelo: 'Civic',
        ano: '2019',
        vin: '2HGES16505H123456',
        color: 'Rojo',
        placa: 'XYZ-789',
        kilometraje: '35000',
        principal: false
      }
    ]);
    
    const mostrarFormulario = ref(false);
    const modoFormulario = ref('agregar');
    const vehiculoEditando = ref(null);
    
    // Métodos
    const editarVehiculo = (vehiculo) => {
      vehiculoEditando.value = { ...vehiculo };
      modoFormulario.value = 'editar';
      mostrarFormulario.value = true;
    };
    
    const eliminarVehiculo = (id) => {
      if (confirm('¿Estás seguro de eliminar este vehículo?')) {
        vehiculos.value = vehiculos.value.filter(v => v.id !== id);
      }
    };
    
    const guardarVehiculo = (vehiculo) => {
      if (modoFormulario.value === 'editar') {
        // Si es principal, quitar la marca de principal de los demás
        if (vehiculo.principal) {
          vehiculos.value = vehiculos.value.map(v => {
            if (v.id !== vehiculo.id) {
              return { ...v, principal: false };
            }
            return v;
          });
        }
        
        // Actualizar vehículo existente
        const index = vehiculos.value.findIndex(v => v.id === vehiculo.id);
        if (index !== -1) {
          vehiculos.value[index] = vehiculo;
        }
      } else {
        // Si es principal, quitar la marca de principal de los demás
        if (vehiculo.principal) {
          vehiculos.value = vehiculos.value.map(v => ({ ...v, principal: false }));
        }
        
        // Agregar nuevo vehículo
        vehiculos.value.push(vehiculo);
      }
      
      mostrarFormulario.value = false;
      vehiculoEditando.value = null;
    };
    
    const cancelarFormulario = () => {
      mostrarFormulario.value = false;
      vehiculoEditando.value = null;
    };
    
    return {
      vehiculos,
      mostrarFormulario,
      modoFormulario,
      vehiculoEditando,
      editarVehiculo,
      eliminarVehiculo,
      guardarVehiculo,
      cancelarFormulario
    };
  }
};
</script>