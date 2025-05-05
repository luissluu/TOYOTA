<template>
    <div class="flex flex-col w-full px-6">
      <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-2">
        <div class="bg-gray-800 md:col-span-2">
          <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-white">Historial de Servicios</h2>
            
            <!-- Filtros y búsqueda -->
            <div class="mt-6 flex flex-col md:flex-row gap-4">
              <div class="relative flex-grow">
                <input type="text" class="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Buscar en historial...">
                <button class="absolute right-2 top-2">
                  <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <div class="flex gap-2">
                <select class="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Período</option>
                  <option value="ultima-semana">Última semana</option>
                  <option value="ultimo-mes">Último mes</option>
                  <option value="ultimos-3-meses">Últimos 3 meses</option>
                  <option value="ultimo-anio">Último año</option>
                  <option value="todos">Todos</option>
                </select>
                <select class="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Estado</option>
                  <option value="completado">Completado</option>
                  <option value="en-proceso">En proceso</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>
            
            <!-- Tabla de historial -->
            <div class="mt-8 overflow-x-auto">
              <table class="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                <thead class="bg-gray-600">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Servicio</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Precio</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-500">
                  <!-- Fila 1 -->
                  <tr class="hover:bg-gray-600">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">#8742</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Cambio de aceite y filtro</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">20/04/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">$750</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completado</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Ver</button>
                      <button class="text-blue-400 hover:text-blue-300">Factura</button>
                    </td>
                  </tr>
                  
                  <!-- Fila 2 -->
                  <tr class="hover:bg-gray-600">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">#8723</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Alineación y balanceo</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">15/04/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">$850</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completado</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Ver</button>
                      <button class="text-blue-400 hover:text-blue-300">Factura</button>
                    </td>
                  </tr>
                  
                  <!-- Fila 3 -->
                  <tr class="hover:bg-gray-600">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">#8654</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Diagnóstico del sistema eléctrico</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">10/04/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">$950</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">En proceso</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Ver</button>
                      <button class="text-gray-400 cursor-not-allowed">Factura</button>
                    </td>
                  </tr>
                  
                  <!-- Fila 4 -->
                  <tr class="hover:bg-gray-600">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">#8597</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Cambio de bujías</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">05/04/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">$550</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Pendiente</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Ver</button>
                      <button class="text-gray-400 cursor-not-allowed">Factura</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación -->
            <div class="flex justify-between items-center mt-8">
              <div class="text-sm text-white">
                Mostrando 1-4 de 24 resultados
              </div>
              <nav class="flex items-center">
                <button class="px-3 py-1 bg-gray-700 text-white rounded-l-md hover:bg-gray-600">Anterior</button>
                <button class="px-3 py-1 bg-blue-600 text-white">1</button>
                <button class="px-3 py-1 bg-gray-700 text-white hover:bg-gray-600">2</button>
                <button class="px-3 py-1 bg-gray-700 text-white hover:bg-gray-600">3</button>
                <button class="px-3 py-1 bg-gray-700 text-white rounded-r-md hover:bg-gray-600">Siguiente</button>
              </nav>
            </div>
            
            <!-- Resumen de estadísticas -->
            <div class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div class="bg-gray-700 p-5 rounded-lg">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                  </div>
                  <div class="ml-5">
                    <p class="text-sm font-medium text-gray-300">Total Gastado</p>
                    <p class="text-2xl font-semibold text-white">$3,100</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-gray-700 p-5 rounded-lg">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-5">
                    <p class="text-sm font-medium text-gray-300">Servicios Completados</p>
                    <p class="text-2xl font-semibold text-white">18</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-gray-700 p-5 rounded-lg">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-5">
                    <p class="text-sm font-medium text-gray-300">En Proceso</p>
                    <p class="text-2xl font-semibold text-white">2</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-gray-700 p-5 rounded-lg">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-gray-500 rounded-md p-3">
                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-5">
                    <p class="text-sm font-medium text-gray-300">Pendientes</p>
                    <p class="text-2xl font-semibold text-white">4</p>
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
    name: 'HistorialPage'
  }
  </script>