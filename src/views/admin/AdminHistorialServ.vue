// src/views/admin/AdminHistorialServicios.vue
<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Historial de Servicios</h2>
          
          <!-- Contenido del historial de servicios -->
          <div class="mt-6 bg-gray-700 rounded-lg p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar servicio..." 
                    class="w-full rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <svg class="absolute right-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <select class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todos los estados</option>
                  <option value="completado">Completado</option>
                  <option value="en-proceso">En proceso</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="cancelado">Cancelado</option>
                </select>
                
                <select class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todos los períodos</option>
                  <option value="hoy">Hoy</option>
                  <option value="semana">Esta semana</option>
                  <option value="mes">Este mes</option>
                  <option value="anio">Este año</option>
                </select>
              </div>
              
              <div class="flex gap-2">
                <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Exportar
                </button>
                
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Nuevo Servicio
                </button>
              </div>
            </div>
            
            <!-- Tabla de historial de servicios -->
            <div class="overflow-x-auto">
              <table class="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                <thead class="bg-gray-700">
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
                <tbody class="divide-y divide-gray-500">
                  <!-- Ejemplo de fila de servicio -->
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">#8742</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Cambio de aceite y filtro</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Luis González</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Toyota Corolla 2020</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">05/05/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">$750</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completado</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">PDF</button>
                    </td>
                  </tr>
                  
                  <!-- Más filas de servicios -->
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">#8723</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Alineación y balanceo</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">María García</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Honda Civic 2019</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">04/05/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">$850</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completado</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">PDF</button>
                    </td>
                  </tr>
                  
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">#8654</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Diagnóstico del sistema eléctrico</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Carlos Rodríguez</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Toyota Rav4 2021</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">03/05/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">$950</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">En proceso</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">PDF</button>
                    </td>
                  </tr>
                  
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">#8597</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Cambio de bujías</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Ana López</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Toyota Camry 2022</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">01/05/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">$550</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Pendiente</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">PDF</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación -->
            <div class="flex justify-between items-center mt-6">
              <div class="text-sm text-gray-400">
                Mostrando 1-4 de 27 resultados
              </div>
              <nav class="flex items-center">
                <button class="px-3 py-1 bg-gray-600 text-white rounded-l-md hover:bg-gray-500">Anterior</button>
                <button class="px-3 py-1 bg-blue-600 text-white">1</button>
                <button class="px-3 py-1 bg-gray-600 text-white hover:bg-gray-500">2</button>
                <button class="px-3 py-1 bg-gray-600 text-white hover:bg-gray-500">3</button>
                <button class="px-3 py-1 bg-gray-600 text-white rounded-r-md hover:bg-gray-500">Siguiente</button>
              </nav>
            </div>
          </div>
          
          <!-- Resumen de estadísticas -->
          <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div class="bg-gray-700 p-5 rounded-lg shadow-sm">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div class="ml-5">
                  <p class="text-sm font-medium text-gray-300">Servicios Totales</p>
                  <p class="text-2xl font-semibold text-white">267</p>
                  <p class="text-sm text-green-400">+12% este mes</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-700 p-5 rounded-lg shadow-sm">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-5">
                  <p class="text-sm font-medium text-gray-300">Completados</p>
                  <p class="text-2xl font-semibold text-white">182</p>
                  <p class="text-sm text-green-400">+8% este mes</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-700 p-5 rounded-lg shadow-sm">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-5">
                  <p class="text-sm font-medium text-gray-300">En Proceso</p>
                  <p class="text-2xl font-semibold text-white">53</p>
                  <p class="text-sm text-yellow-400">+3% este mes</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-700 p-5 rounded-lg shadow-sm">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div class="ml-5">
                  <p class="text-sm font-medium text-gray-300">Pendientes</p>
                  <p class="text-2xl font-semibold text-white">32</p>
                  <p class="text-sm text-blue-400">+2% este mes</p>
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
export default {
  name: 'AdminHistorialServicios'
}
</script>