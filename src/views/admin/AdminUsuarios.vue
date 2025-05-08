// src/views/admin/AdminUsuarios.vue
<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Gestión de Usuarios</h2>
          
          <!-- Contenido de gestión de usuarios -->
          <div class="mt-6 bg-gray-700 rounded-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <div class="relative flex-grow max-w-sm">
                <input type="text" placeholder="Buscar usuario..." class="w-full rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <svg class="absolute right-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Añadir Usuario
              </button>
            </div>
            
            <!-- Tabla de usuarios -->
            <div class="overflow-x-auto">
              <table class="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                <thead class="bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rol</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-500">
                  <!-- Ejemplo de fila de usuario -->
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">#001</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Luis González</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">luis@ejemplo.com</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Usuario</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Activo</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Editar</button>
                      <button class="text-red-400 hover:text-red-300">Eliminar</button>
                    </td>
                  </tr>
                  
                  <!-- Más filas de usuarios -->
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">#002</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">María García</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">maria@ejemplo.com</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Usuario</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Activo</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Editar</button>
                      <button class="text-red-400 hover:text-red-300">Eliminar</button>
                    </td>
                  </tr>
                  
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">#003</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Carlos Rodríguez</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">carlos@ejemplo.com</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Usuario</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>
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
                Mostrando 1-3 de 25 resultados
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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AdminUsuarios'
}
</script>