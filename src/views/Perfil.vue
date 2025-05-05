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
                          <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="Foto de perfil" class="w-full h-full object-cover">
                        </div>
                      </div>
                      <div class="flex-grow">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label class="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                            <div class="w-full px-3 py-2 bg-gray-600 text-white rounded-md">Dhaiflaah</div>
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-400 mb-1">Rol</label>
                            <div class="w-full px-3 py-2 bg-gray-600 text-white rounded-md">Lecturer</div>
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
                            <div class="w-full px-3 py-2 bg-gray-600 text-white rounded-md">dhaiflaah@ejemplo.com</div>
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
                            <div class="w-full px-3 py-2 bg-gray-600 text-white rounded-md">+52 123 456 7890</div>
                          </div>
                        </div>
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
                
                <!-- Vehículos asociados -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-white border-b border-gray-600 pb-2 mb-4">Mis Vehículos</h3>
                  <div class="bg-gray-700 rounded-lg p-6">
                    <div class="space-y-4">
                      <div class="bg-gray-800 p-4 rounded-lg">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <h4 class="text-white font-medium">Honda Civic 2020</h4>
                            <p class="text-gray-400 text-sm">VIN: 123</p>
                            <p class="text-gray-400 text-sm">Último servicio: 26 abril, 2025</p>
                          </div>
                          <span class="mt-2 md:mt-0 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm">Principal</span>
                        </div>
                      </div>
                      
                      <div class="bg-gray-800 p-4 rounded-lg">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <h4 class="text-white font-medium">Toyota Corolla 2019</h4>
                            <p class="text-gray-400 text-sm">VIN: 789</p>
                            <p class="text-gray-400 text-sm">Último servicio: 15 marzo, 2025</p>
                          </div>
                          <span class="mt-2 md:mt-0 bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm">Secundario</span>
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
  export default {
    name: 'PerfilPage'
  }
  </script>