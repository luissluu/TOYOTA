// src/views/admin/AdminHistorialServicios.vue
<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold tracking-tight text-white">Historial de Servicios</h2>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input 
                  type="text" 
                  v-model="busqueda" 
                  placeholder="Buscar servicio..." 
                  class="w-64 rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <svg class="absolute left-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button 
                @click="exportarServicios" 
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
              >
                <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Exportar Historial
              </button>
            </div>
          </div>

          <!-- Filtros -->
          <div class="flex flex-wrap gap-4 mb-6">
            <select 
              v-model="filtroEstado" 
              class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="completado">Completado</option>
              <option value="en-proceso">En proceso</option>
              <option value="pendiente">Pendiente</option>
              <option value="cancelado">Cancelado</option>
            </select>
            
            <select 
              v-model="filtroPeriodo" 
              class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los períodos</option>
              <option value="hoy">Hoy</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
              <option value="anio">Este año</option>
            </select>
          </div>
          
          <!-- Tabla de historial de servicios -->
          <div class="bg-gray-700 rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-600">
                <thead class="bg-gray-800">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Servicio</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vehículo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Precio</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-gray-700 divide-y divide-gray-600">
                  <tr v-for="servicio in serviciosFiltrados" :key="servicio.id" class="hover:bg-gray-600 transition-colors duration-200">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ servicio.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ servicio.tipo }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img class="h-10 w-10 rounded-full" :src="servicio.cliente.avatar" :alt="servicio.cliente.nombre">
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-white">{{ servicio.cliente.nombre }}</div>
                          <div class="text-sm text-gray-400">{{ servicio.cliente.telefono }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-white">{{ servicio.vehiculo.modelo }}</div>
                      <div class="text-sm text-gray-400">{{ servicio.vehiculo.placa }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ servicio.fecha }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">${{ servicio.precio }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        :class="{
                          'bg-green-100 text-green-800': servicio.estado === 'completado',
                          'bg-yellow-100 text-yellow-800': servicio.estado === 'en-proceso',
                          'bg-blue-100 text-blue-800': servicio.estado === 'pendiente',
                          'bg-red-100 text-red-800': servicio.estado === 'cancelado'
                        }"
                      >
                        {{ servicio.estado }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex space-x-3">
                        <button 
                          @click="generarPDF(servicio)" 
                          class="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button 
                          @click="verDetalles(servicio)" 
                          class="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación -->
            <div class="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Anterior
                </button>
                <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Siguiente
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-400">
                    Mostrando
                    <span class="font-medium">{{ paginacion.desde }}</span>
                    a
                    <span class="font-medium">{{ paginacion.hasta }}</span>
                    de
                    <span class="font-medium">{{ paginacion.total }}</span>
                    resultados
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button 
                      @click="cambiarPagina(paginacion.paginaActual - 1)"
                      :disabled="paginacion.paginaActual === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Anterior</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      v-for="pagina in paginacion.totalPaginas" 
                      :key="pagina"
                      @click="cambiarPagina(pagina)"
                      :class="[
                        'relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium',
                        pagina === paginacion.paginaActual 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      ]"
                    >
                      {{ pagina }}
                    </button>
                    <button 
                      @click="cambiarPagina(paginacion.paginaActual + 1)"
                      :disabled="paginacion.paginaActual === paginacion.totalPaginas"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Siguiente</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Resumen de estadísticas -->
          <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div class="bg-gray-700 p-5 rounded-lg shadow-sm hover:bg-gray-600 transition-colors duration-200">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div class="ml-5">
                  <p class="text-sm font-medium text-gray-300">Servicios Totales</p>
                  <p class="text-2xl font-semibold text-white">{{ estadisticas.total }}</p>
                  <p class="text-sm" :class="estadisticas.cambioTotal >= 0 ? 'text-green-400' : 'text-red-400'">
                    {{ estadisticas.cambioTotal >= 0 ? '+' : '' }}{{ estadisticas.cambioTotal }}% este mes
                  </p>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-700 p-5 rounded-lg shadow-sm hover:bg-gray-600 transition-colors duration-200">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-5">
                  <p class="text-sm font-medium text-gray-300">Completados</p>
                  <p class="text-2xl font-semibold text-white">{{ estadisticas.completados }}</p>
                  <p class="text-sm" :class="estadisticas.cambioCompletados >= 0 ? 'text-green-400' : 'text-red-400'">
                    {{ estadisticas.cambioCompletados >= 0 ? '+' : '' }}{{ estadisticas.cambioCompletados }}% este mes
                  </p>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-700 p-5 rounded-lg shadow-sm hover:bg-gray-600 transition-colors duration-200">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-5">
                  <p class="text-sm font-medium text-gray-300">En Proceso</p>
                  <p class="text-2xl font-semibold text-white">{{ estadisticas.enProceso }}</p>
                  <p class="text-sm" :class="estadisticas.cambioEnProceso >= 0 ? 'text-green-400' : 'text-red-400'">
                    {{ estadisticas.cambioEnProceso >= 0 ? '+' : '' }}{{ estadisticas.cambioEnProceso }}% este mes
                  </p>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-700 p-5 rounded-lg shadow-sm hover:bg-gray-600 transition-colors duration-200">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div class="ml-5">
                  <p class="text-sm font-medium text-gray-300">Pendientes</p>
                  <p class="text-2xl font-semibold text-white">{{ estadisticas.pendientes }}</p>
                  <p class="text-sm" :class="estadisticas.cambioPendientes >= 0 ? 'text-green-400' : 'text-red-400'">
                    {{ estadisticas.cambioPendientes >= 0 ? '+' : '' }}{{ estadisticas.cambioPendientes }}% este mes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de detalles del servicio -->
    <div v-if="mostrarDetalles" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50" @click="mostrarDetalles = false"></div>
      <div class="relative bg-gray-800 max-w-4xl w-full mx-auto rounded-lg shadow-lg p-6">
        <button @click="mostrarDetalles = false" class="absolute top-4 right-4 text-gray-400 hover:text-white">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div v-if="servicioDetalle" class="space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-medium text-white">Detalles del Servicio #{{ servicioDetalle.id }}</h3>
              <p class="text-gray-400 mt-1">{{ servicioDetalle.fecha }}</p>
            </div>
            <span class="px-3 py-1 rounded-full text-sm font-medium" 
              :class="{
                'bg-green-100 text-green-800': servicioDetalle.estado === 'completado',
                'bg-yellow-100 text-yellow-800': servicioDetalle.estado === 'en-proceso',
                'bg-blue-100 text-blue-800': servicioDetalle.estado === 'pendiente',
                'bg-red-100 text-red-800': servicioDetalle.estado === 'cancelado'
              }"
            >
              {{ servicioDetalle.estado }}
            </span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-700 p-4 rounded-lg">
              <h4 class="text-lg font-medium text-white mb-3">Información del Cliente</h4>
              <div class="space-y-2">
                <p class="text-gray-300">
                  <span class="text-gray-400">Nombre:</span> {{ servicioDetalle.cliente.nombre }}
                </p>
                <p class="text-gray-300">
                  <span class="text-gray-400">Teléfono:</span> {{ servicioDetalle.cliente.telefono }}
                </p>
                <p class="text-gray-300">
                  <span class="text-gray-400">Email:</span> {{ servicioDetalle.cliente.email }}
                </p>
              </div>
            </div>
            
            <div class="bg-gray-700 p-4 rounded-lg">
              <h4 class="text-lg font-medium text-white mb-3">Información del Vehículo</h4>
              <div class="space-y-2">
                <p class="text-gray-300">
                  <span class="text-gray-400">Modelo:</span> {{ servicioDetalle.vehiculo.modelo }}
                </p>
                <p class="text-gray-300">
                  <span class="text-gray-400">Placa:</span> {{ servicioDetalle.vehiculo.placa }}
                </p>
                <p class="text-gray-300">
                  <span class="text-gray-400">Año:</span> {{ servicioDetalle.vehiculo.anio }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-700 p-4 rounded-lg">
            <h4 class="text-lg font-medium text-white mb-3">Detalles del Servicio</h4>
            <div class="space-y-2">
              <p class="text-gray-300">
                <span class="text-gray-400">Tipo:</span> {{ servicioDetalle.tipo }}
              </p>
              <p class="text-gray-300">
                <span class="text-gray-400">Descripción:</span> {{ servicioDetalle.descripcion }}
              </p>
              <p class="text-gray-300">
                <span class="text-gray-400">Precio:</span> ${{ servicioDetalle.precio }}
              </p>
            </div>
          </div>
          
          <div class="bg-gray-700 p-4 rounded-lg">
            <h4 class="text-lg font-medium text-white mb-3">Historial de Actualizaciones</h4>
            <div class="space-y-4">
              <div v-for="(actualizacion, index) in servicioDetalle.historial" :key="index" class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <svg class="h-4 w-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm text-gray-300">{{ actualizacion.fecha }}</p>
                  <p class="text-sm text-gray-400">{{ actualizacion.descripcion }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'AdminHistorialServicios',
  setup() {
    const mostrarDetalles = ref(false);
    const servicioDetalle = ref(null);
    const busqueda = ref('');
    const filtroEstado = ref('');
    const filtroPeriodo = ref('');

    // Datos de ejemplo
    const servicios = ref([
      {
        id: '#8742',
        tipo: 'Cambio de aceite y filtro',
        cliente: {
          nombre: 'Luis González',
          telefono: '555-0123',
          email: 'luis@ejemplo.com',
          avatar: 'https://ui-avatars.com/api/?name=Luis+Gonzalez&background=random'
        },
        vehiculo: {
          modelo: 'Toyota Corolla 2020',
          placa: 'ABC123',
          anio: '2020'
        },
        fecha: '05/05/2025',
        precio: '750',
        estado: 'completado',
        descripcion: 'Cambio de aceite sintético y filtro de aceite',
        historial: [
          {
            fecha: '05/05/2025 14:30',
            descripcion: 'Servicio completado'
          },
          {
            fecha: '05/05/2025 10:15',
            descripcion: 'Inicio del servicio'
          }
        ]
      }
    ]);

    const estadisticas = ref({
      total: 267,
      completados: 182,
      enProceso: 53,
      pendientes: 32,
      cambioTotal: 12,
      cambioCompletados: 8,
      cambioEnProceso: 3,
      cambioPendientes: 2
    });

    const paginacion = ref({
      paginaActual: 1,
      totalPaginas: 3,
      desde: 1,
      hasta: 4,
      total: 27
    });

    const serviciosFiltrados = computed(() => {
      return servicios.value.filter(servicio => {
        const coincideBusqueda = servicio.tipo.toLowerCase().includes(busqueda.value.toLowerCase()) ||
                                servicio.cliente.nombre.toLowerCase().includes(busqueda.value.toLowerCase());
        const coincideEstado = !filtroEstado.value || servicio.estado === filtroEstado.value;
        const coincidePeriodo = !filtroPeriodo.value || filtrarPorPeriodo(servicio.fecha, filtroPeriodo.value);
        
        return coincideBusqueda && coincideEstado && coincidePeriodo;
      });
    });

    const filtrarPorPeriodo = (fecha, periodo) => {
      const hoy = new Date();
      const fechaServicio = new Date(fecha);
      
      switch (periodo) {
        case 'hoy':
          return fechaServicio.toDateString() === hoy.toDateString();
        case 'semana':
          const inicioSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay()));
          return fechaServicio >= inicioSemana;
        case 'mes':
          return fechaServicio.getMonth() === hoy.getMonth() && 
                 fechaServicio.getFullYear() === hoy.getFullYear();
        case 'anio':
          return fechaServicio.getFullYear() === hoy.getFullYear();
        default:
          return true;
      }
    };

    const verDetalles = (servicio) => {
      servicioDetalle.value = servicio;
      mostrarDetalles.value = true;
    };

    const generarPDF = (servicio) => {
      // Implementar generación de PDF
      console.log('Generando PDF para:', servicio);
    };

    const exportarServicios = () => {
      // Implementar exportación de servicios
      console.log('Exportando historial de servicios...');
    };

    const cambiarPagina = (pagina) => {
      paginacion.value.paginaActual = pagina;
      // Aquí iría la lógica para cargar los datos de la nueva página
    };

    return {
      mostrarDetalles,
      servicioDetalle,
      busqueda,
      filtroEstado,
      filtroPeriodo,
      servicios,
      estadisticas,
      paginacion,
      serviciosFiltrados,
      verDetalles,
      generarPDF,
      exportarServicios,
      cambiarPagina
    };
  }
};
</script>