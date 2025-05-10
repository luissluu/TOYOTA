<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Inventario de Piezas y Herramientas</h2>
          
          <!-- Pestañas para cambiar entre piezas y herramientas -->
          <div class="mt-6 border-b border-gray-600">
            <nav class="flex space-x-8">
              <button 
                @click="tipoInventario = 'piezas'" 
                class="px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200" 
                :class="tipoInventario === 'piezas' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-300'"
              >
                Piezas
              </button>
              <button 
                @click="tipoInventario = 'herramientas'" 
                class="px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200" 
                :class="tipoInventario === 'herramientas' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-300'"
              >
                Herramientas
              </button>
              <button 
                @click="tipoInventario = 'prestamos'" 
                class="px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200" 
                :class="tipoInventario === 'prestamos' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-300'"
              >
                Préstamos Activos
              </button>
            </nav>
          </div>
          
          <!-- Contenido de inventario de piezas -->
          <div v-if="tipoInventario === 'piezas'" class="mt-6 bg-gray-700 rounded-lg p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar pieza..." 
                    class="w-full rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <svg class="absolute right-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <select class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todas las categorías</option>
                  <option value="motor">Motor</option>
                  <option value="suspensión">Suspensión</option>
                  <option value="frenos">Frenos</option>
                  <option value="electrico">Sistema Eléctrico</option>
                  <option value="filtros">Filtros</option>
                </select>
                
                <select class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todos los estados</option>
                  <option value="disponible">Disponible</option>
                  <option value="bajo">Stock Bajo</option>
                  <option value="agotado">Agotado</option>
                </select>
              </div>
              
              <div class="flex gap-2">
                <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Exportar
                </button>
                
                <button 
                  @click="mostrarFormularioPieza = true" 
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Añadir Pieza
                </button>
              </div>
            </div>
            
            <!-- Tabla de piezas -->
            <div class="overflow-x-auto">
              <table class="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                <thead class="bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Categoría</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock Actual</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock Mínimo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Precio Unitario</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-500">
                  <!-- Ejemplo de filas de piezas -->
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">P001</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Filtro de aceite</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Filtros</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">45</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">10</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">$25</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Disponible</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Editar</button>
                      <button class="text-red-400 hover:text-red-300">Eliminar</button>
                    </td>
                  </tr>
                  
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">P002</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Bujía de encendido</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Motor</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">28</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">20</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">$12</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Disponible</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Editar</button>
                      <button class="text-red-400 hover:text-red-300">Eliminar</button>
                    </td>
                  </tr>
                  
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">P003</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Pastillas de freno</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Frenos</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">8</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">12</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">$45</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Stock Bajo</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Editar</button>
                      <button class="text-red-400 hover:text-red-300">Eliminar</button>
                    </td>
                  </tr>
                  
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">P004</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Aceite sintético 5W-30</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Lubricantes</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">0</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">15</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">$35</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Agotado</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Editar</button>
                      <button class="text-red-400 hover:text-red-300">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación -->
            <div class="flex justify-between items-center mt-6">
              <div class="text-sm text-gray-400">
                Mostrando 1-4 de 42 resultados
              </div>
              <nav class="flex items-center">
                <button class="px-3 py-1 bg-gray-600 text-white rounded-l-md hover:bg-gray-500">Anterior</button>
                <button class="px-3 py-1 bg-blue-600 text-white">1</button>
                <button class="px-3 py-1 bg-gray-600 text-white hover:bg-gray-500">2</button>
                <button class="px-3 py-1 bg-gray-600 text-white hover:bg-gray-500">3</button>
                <button class="px-3 py-1 bg-gray-600 text-white rounded-r-md hover:bg-gray-500">Siguiente</button>
              </nav>
            </div>
            
            <!-- Formulario modal para añadir/editar pieza -->
            <div v-if="mostrarFormularioPieza" class="fixed inset-0 flex items-center justify-center z-50">
              <div class="absolute inset-0 bg-black opacity-50" @click="mostrarFormularioPieza = false"></div>
              <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6">
                <button @click="mostrarFormularioPieza = false" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h3 class="text-xl font-medium text-white mb-4">Añadir Nueva Pieza</h3>
                
                <form @submit.prevent="guardarPieza" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                    <input type="text" v-model="nuevaPieza.nombre" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Categoría</label>
                    <select v-model="nuevaPieza.categoria" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">Selecciona una categoría</option>
                      <option value="Motor">Motor</option>
                      <option value="Suspensión">Suspensión</option>
                      <option value="Frenos">Frenos</option>
                      <option value="Eléctrico">Sistema Eléctrico</option>
                      <option value="Filtros">Filtros</option>
                      <option value="Lubricantes">Lubricantes</option>
                    </select>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-400 mb-1">Stock Actual</label>
                      <input type="number" v-model="nuevaPieza.stockActual" min="0" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-400 mb-1">Stock Mínimo</label>
                      <input type="number" v-model="nuevaPieza.stockMinimo" min="1" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Precio Unitario</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-400">$</span>
                      </div>
                      <input type="number" v-model="nuevaPieza.precio" min="0" step="0.01" class="w-full rounded-md bg-gray-700 border-gray-600 text-white pl-7 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                  </div>
                  
                  <div class="flex justify-end space-x-3 mt-6">
                    <button 
                      type="button" 
                      @click="mostrarFormularioPieza = false" 
                      class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <!-- Contenido de inventario de herramientas -->
          <div v-if="tipoInventario === 'herramientas'" class="mt-6 bg-gray-700 rounded-lg p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar herramienta..." 
                    class="w-full rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <svg class="absolute right-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <select class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todos los tipos</option>
                  <option value="manual">Herramientas Manuales</option>
                  <option value="electrica">Herramientas Eléctricas</option>
                  <option value="medicion">Instrumentos de Medición</option>
                  <option value="diagnostico">Diagnóstico</option>
                </select>
                
                <select class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todos los estados</option>
                  <option value="disponible">Disponible</option>
                  <option value="prestado">Prestado</option>
                  <option value="mantenimiento">En Mantenimiento</option>
                </select>
              </div>
              
              <div class="flex gap-2">                
                <button 
                  @click="mostrarFormularioHerramienta = true" 
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Añadir Herramienta
                </button>
              </div>
            </div>
            
            <!-- Tabla de herramientas -->
            <div class="overflow-x-auto">
              <table class="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                <thead class="bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tipo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ubicación</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Último Préstamo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-500">
                  <!-- Ejemplo de filas de herramientas -->
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">H001</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Llave dinamométrica</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Manual</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Estante A, Sección 2</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Disponible</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">03/05/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button @click="abrirPrestamoModal('H001', 'Llave dinamométrica')" class="text-blue-400 hover:text-blue-300 mr-2">Prestar</button>
                      <button class="text-yellow-400 hover:text-yellow-300 mr-2">Editar</button>
                    </td>
                  </tr>
                  
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">H002</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Escáner OBD2</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Diagnóstico</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Armario B, Cajón 1</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Prestado</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">05/05/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button @click="registrarDevolucion('H002')" class="text-green-400 hover:text-green-300 mr-2">Devolver</button>
                      <button class="text-yellow-400 hover:text-yellow-300 mr-2">Editar</button>
                    </td>
                  </tr>
                  
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">H003</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Gato hidráulico</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Manual</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Área de servicio</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Mantenimiento</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">28/04/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-yellow-400 hover:text-yellow-300 mr-2">Editar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación -->
            <div class="flex justify-between items-center mt-6">
              <div class="text-sm text-gray-400">
                Mostrando 1-3 de 18 resultados
              </div>
              <nav class="flex items-center">
                <button class="px-3 py-1 bg-gray-600 text-white rounded-l-md hover:bg-gray-500">Anterior</button>
                <button class="px-3 py-1 bg-blue-600 text-white">1</button>
                <button class="px-3 py-1 bg-gray-600 text-white hover:bg-gray-500">2</button>
                <button class="px-3 py-1 bg-gray-600 text-white hover:bg-gray-500">3</button>
                <button class="px-3 py-1 bg-gray-600 text-white rounded-r-md hover:bg-gray-500">Siguiente</button>
              </nav>
            </div>
            
            <!-- Formulario modal para añadir/editar herramienta -->
            <div v-if="mostrarFormularioHerramienta" class="fixed inset-0 flex items-center justify-center z-50">
              <div class="absolute inset-0 bg-black opacity-50" @click="mostrarFormularioHerramienta = false"></div>
              <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6">
                <button @click="mostrarFormularioHerramienta = false" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h3 class="text-xl font-medium text-white mb-4">Añadir Nueva Herramienta</h3>
                
                <form @submit.prevent="guardarHerramienta" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                    <input type="text" v-model="nuevaHerramienta.nombre" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Tipo</label>
                    <select v-model="nuevaHerramienta.tipo" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">Selecciona un tipo</option>
                      <option value="Manual">Herramientas Manuales</option>
                      <option value="Eléctrica">Herramientas Eléctricas</option>
                      <option value="Medición">Instrumentos de Medición</option>
                      <option value="Diagnóstico">Diagnóstico</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Ubicación</label>
                    <input type="text" v-model="nuevaHerramienta.ubicacion" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>
                  
                  <div class="flex justify-end space-x-3 mt-6">
                    <button 
                      type="button" 
                      @click="mostrarFormularioHerramienta = false" 
                      class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <!-- Modal para registrar préstamo de herramienta -->
            <div v-if="mostrarModalPrestamo" class="fixed inset-0 flex items-center justify-center z-50">
              <div class="absolute inset-0 bg-black opacity-50" @click="mostrarModalPrestamo = false"></div>
              <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6">
                <button @click="mostrarModalPrestamo = false" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h3 class="text-xl font-medium text-white mb-4">Registrar Préstamo</h3>
                
                <form @submit.prevent="registrarPrestamo" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Herramienta</label>
                    <input type="text" v-model="prestamo.herramientaNombre" class="w-full rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2" disabled>
                    <input type="hidden" v-model="prestamo.herramientaId">
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Usuario</label>
                    <select v-model="prestamo.usuario" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">Selecciona un usuario</option>
                      <option value="Luis González">Luis González</option>
                      <option value="María García">María García</option>
                      <option value="Carlos Rodríguez">Carlos Rodríguez</option>
                      <option value="Ana López">Ana López</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Fecha y Hora de Préstamo</label>
                    <input type="datetime-local" v-model="prestamo.fechaHora" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Notas</label>
                    <textarea v-model="prestamo.notas" rows="3" class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                  
                  <div class="flex justify-end space-x-3 mt-6">
                    <button 
                      type="button" 
                      @click="mostrarModalPrestamo = false" 
                      class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Registrar Préstamo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <!-- Contenido de préstamos activos -->
          <div v-if="tipoInventario === 'prestamos'" class="mt-6 bg-gray-700 rounded-lg p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar por herramienta o usuario..." 
                    class="w-full rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <svg class="absolute right-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <select class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Todos los usuarios</option>
                  <option value="Luis González">Luis González</option>
                  <option value="María García">María García</option>
                  <option value="Carlos Rodríguez">Carlos Rodríguez</option>
                  <option value="Ana López">Ana López</option>
                </select>
              </div>
              
              <div class="flex gap-2">                
                <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Exportar Reporte
                </button>
              </div>
            </div>
            
            <!-- Tabla de préstamos activos -->
            <div class="overflow-x-auto">
              <table class="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                <thead class="bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID Herramienta</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Herramienta</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Usuario</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha Préstamo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-500">
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">H002</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Escáner OBD2</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Carlos Rodríguez</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">05/05/2025 14:30</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Prestado</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button @click="registrarDevolucion('H002')" class="text-green-400 hover:text-green-300 mr-2">Devolver</button>
                      <button class="text-blue-400 hover:text-blue-300">Ver Detalles</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación -->
            <div class="flex justify-between items-center mt-6">
              <div class="text-sm text-gray-400">
                Mostrando 1-1 de 1 resultados
              </div>
              <nav class="flex items-center">
                <button class="px-3 py-1 bg-gray-600 text-white rounded-l-md hover:bg-gray-500">Anterior</button>
                <button class="px-3 py-1 bg-blue-600 text-white">1</button>
                <button class="px-3 py-1 bg-gray-600 text-white rounded-r-md hover:bg-gray-500">Siguiente</button>
              </nav>
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
  name: 'AdminInventario',
  setup() {
    const tipoInventario = ref('piezas');
    const mostrarFormularioPieza = ref(false);
    const mostrarFormularioHerramienta = ref(false);
    const mostrarModalPrestamo = ref(false);
    
    const nuevaPieza = ref({
      nombre: '',
      categoria: '',
      stockActual: 0,
      stockMinimo: 0,
      precio: 0
    });
    
    const nuevaHerramienta = ref({
      nombre: '',
      tipo: '',
      ubicacion: ''
    });
    
    const prestamo = ref({
      herramientaId: '',
      herramientaNombre: '',
      usuario: '',
      fechaHora: '',
      notas: ''
    });
    
    const guardarPieza = () => {
      // Lógica para guardar la pieza
      mostrarFormularioPieza.value = false;
    };
    
    const guardarHerramienta = () => {
      // Lógica para guardar la herramienta
      mostrarFormularioHerramienta.value = false;
    };
    
    const abrirPrestamoModal = (id, nombre) => {
      prestamo.value.herramientaId = id;
      prestamo.value.herramientaNombre = nombre;
      mostrarModalPrestamo.value = true;
    };
    
    const registrarPrestamo = () => {
      // Lógica para registrar el préstamo
      mostrarModalPrestamo.value = false;
    };
    
    const registrarDevolucion = (id) => {
      // Lógica para registrar la devolución
    };
    
    return {
      tipoInventario,
      mostrarFormularioPieza,
      mostrarFormularioHerramienta,
      mostrarModalPrestamo,
      nuevaPieza,
      nuevaHerramienta,
      prestamo,
      guardarPieza,
      guardarHerramienta,
      abrirPrestamoModal,
      registrarPrestamo,
      registrarDevolucion
    };
  }
};
</script> 