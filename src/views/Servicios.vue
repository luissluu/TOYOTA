<template>
    <div class="flex flex-col w-full px-6">
      <!-- Banner Principal -->
      <section class="bg-gray-800 rounded-lg overflow-hidden mb-8">
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-90"></div>
          <div class="relative py-12 px-8 md:px-12 lg:px-16 z-10">
            <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">Servicios Automotrices Toyota</h1>
            <p class="text-white text-lg mb-6 max-w-2xl">Cuidamos tu vehículo con la más alta calidad y garantía. Todos nuestros servicios incluyen mano de obra certificada y refacciones originales.</p>
            <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Realizar diagnóstico
            </button>
          </div>
        </div>
      </section>
  
      <!-- Navegación por Categorías -->
      <div class="mb-8">
        <div class="flex flex-wrap md:flex-nowrap gap-2 justify-center">
          <button @click="activeCategory = 'todos'" 
                  :class="[activeCategory === 'todos' ? 'bg-blue-700' : 'bg-gray-700 hover:bg-blue-700', 
                  'px-4 py-2 rounded-lg text-sm font-medium text-white']">
            Todos los servicios
          </button>
          <button @click="activeCategory = 'mantenimiento'" 
                  :class="[activeCategory === 'mantenimiento' ? 'bg-blue-700' : 'bg-gray-700 hover:bg-blue-700', 
                  'px-4 py-2 rounded-lg text-sm font-medium text-white']">
            Mantenimiento básico
          </button>
          <button @click="activeCategory = 'motor'" 
                  :class="[activeCategory === 'motor' ? 'bg-blue-700' : 'bg-gray-700 hover:bg-blue-700', 
                  'px-4 py-2 rounded-lg text-sm font-medium text-white']">
            Sistema de motor
          </button>
          <button @click="activeCategory = 'frenos'" 
                  :class="[activeCategory === 'frenos' ? 'bg-blue-700' : 'bg-gray-700 hover:bg-blue-700', 
                  'px-4 py-2 rounded-lg text-sm font-medium text-white']">
            Sistema de frenos
          </button>
          <button @click="activeCategory = 'suspension'" 
                  :class="[activeCategory === 'suspension' ? 'bg-blue-700' : 'bg-gray-700 hover:bg-blue-700', 
                  'px-4 py-2 rounded-lg text-sm font-medium text-white']">
            Suspensión y dirección
          </button>
        </div>
      </div>
  
      <!-- Sección de Servicios -->
      <section class="grid grid-cols-1 gap-8 px-4 md:px-8">
        <!-- Mostrar todas las categorías si 'todos' está seleccionado -->
        <template v-if="activeCategory === 'todos'">
          <!-- Mantenimiento básico -->
          <div class="bg-gray-800">
            <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
              <h2 class="text-2xl font-bold tracking-tight text-white mb-4">Mantenimiento básico</h2>
              
              <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <!-- Tu tarjeta de Cambio de aceite -->
                <div v-for="servicio in serviciosPorCategoria('mantenimiento')" :key="servicio.id" 
                     class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                  <a href="#" class="flex-shrink-0">
                    <div class="w-full h-48 overflow-hidden rounded-t-lg">
                      <img class="w-full h-full object-cover" :src="servicio.imagen" alt="servicio.titulo" />
                    </div>
                  </a>
                  <div class="px-5 py-4 flex-grow flex flex-col">
                    <a href="#" class="mb-auto">
                      <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">{{ servicio.titulo }}</h5>
                    </a>
                    <p class="text-sm text-gray-600 mb-3">{{ servicio.descripcion }}</p>
                    <!-- Estrellas de calificación -->
                    <div class="flex items-center mt-2 mb-4">
                      <div class="flex items-center space-x-1 rtl:space-x-reverse">
                        <div v-for="i in 5" :key="i">
                          <svg class="w-4 h-4" :class="i <= servicio.calificacion ? 'text-yellow-300' : 'text-gray-200'" 
                               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                          </svg>
                        </div>
                      </div>
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">{{ servicio.calificacion }}.0</span>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                      <span class="text-3xl font-bold text-gray-900">${{ servicio.precio }}</span>
                      <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Solicitar</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Sistema de motor -->
          <div class="bg-gray-800 mt-12">
            <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
              <h2 class="text-2xl font-bold tracking-tight text-white mb-4">Sistema de motor</h2>
              
              <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <!-- Las mismas tarjetas de arriba pero con serviciosPorCategoria('motor') -->
                <div v-for="servicio in serviciosPorCategoria('motor')" :key="servicio.id" 
                     class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                  <!-- Mismo contenido de la tarjeta anterior -->
                  <a href="#" class="flex-shrink-0">
                    <div class="w-full h-48 overflow-hidden rounded-t-lg">
                      <img class="w-full h-full object-cover" :src="servicio.imagen" alt="servicio.titulo" />
                    </div>
                  </a>
                  <div class="px-5 py-4 flex-grow flex flex-col">
                    <a href="#" class="mb-auto">
                      <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">{{ servicio.titulo }}</h5>
                    </a>
                    <p class="text-sm text-gray-600 mb-3">{{ servicio.descripcion }}</p>
                    <div class="flex items-center mt-2 mb-4">
                      <div class="flex items-center space-x-1 rtl:space-x-reverse">
                        <div v-for="i in 5" :key="i">
                          <svg class="w-4 h-4" :class="i <= servicio.calificacion ? 'text-yellow-300' : 'text-gray-200'" 
                               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                          </svg>
                        </div>
                      </div>
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">{{ servicio.calificacion }}.0</span>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                      <span class="text-3xl font-bold text-gray-900">${{ servicio.precio }}</span>
                      <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Solicitar</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Sistema de frenos -->
          <div class="bg-gray-800 mt-12">
            <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
              <h2 class="text-2xl font-bold tracking-tight text-white mb-4">Sistema de frenos</h2>
              
              <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <!-- Las mismas tarjetas pero con serviciosPorCategoria('frenos') -->
                <div v-for="servicio in serviciosPorCategoria('frenos')" :key="servicio.id" 
                     class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                  <!-- Mismo contenido de tarjeta -->
                  <a href="#" class="flex-shrink-0">
                    <div class="w-full h-48 overflow-hidden rounded-t-lg">
                      <img class="w-full h-full object-cover" :src="servicio.imagen" alt="servicio.titulo" />
                    </div>
                  </a>
                  <div class="px-5 py-4 flex-grow flex flex-col">
                    <a href="#" class="mb-auto">
                      <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">{{ servicio.titulo }}</h5>
                    </a>
                    <p class="text-sm text-gray-600 mb-3">{{ servicio.descripcion }}</p>
                    <div class="flex items-center mt-2 mb-4">
                      <div class="flex items-center space-x-1 rtl:space-x-reverse">
                        <div v-for="i in 5" :key="i">
                          <svg class="w-4 h-4" :class="i <= servicio.calificacion ? 'text-yellow-300' : 'text-gray-200'" 
                               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                          </svg>
                        </div>
                      </div>
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">{{ servicio.calificacion }}.0</span>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                      <span class="text-3xl font-bold text-gray-900">${{ servicio.precio }}</span>
                      <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Solicitar</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Suspensión y dirección -->
          <div class="bg-gray-800 mt-12">
            <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
              <h2 class="text-2xl font-bold tracking-tight text-white mb-4">Suspensión y dirección</h2>
              
              <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <!-- Las mismas tarjetas pero con serviciosPorCategoria('suspension') -->
                <div v-for="servicio in serviciosPorCategoria('suspension')" :key="servicio.id" 
                     class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                  <!-- Mismo contenido de tarjeta -->
                  <a href="#" class="flex-shrink-0">
                    <div class="w-full h-48 overflow-hidden rounded-t-lg">
                      <img class="w-full h-full object-cover" :src="servicio.imagen" alt="servicio.titulo" />
                    </div>
                  </a>
                  <div class="px-5 py-4 flex-grow flex flex-col">
                    <a href="#" class="mb-auto">
                      <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">{{ servicio.titulo }}</h5>
                    </a>
                    <p class="text-sm text-gray-600 mb-3">{{ servicio.descripcion }}</p>
                    <div class="flex items-center mt-2 mb-4">
                      <div class="flex items-center space-x-1 rtl:space-x-reverse">
                        <div v-for="i in 5" :key="i">
                          <svg class="w-4 h-4" :class="i <= servicio.calificacion ? 'text-yellow-300' : 'text-gray-200'" 
                               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                          </svg>
                        </div>
                      </div>
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">{{ servicio.calificacion }}.0</span>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                      <span class="text-3xl font-bold text-gray-900">${{ servicio.precio }}</span>
                      <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Solicitar</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
  
        <!-- Mostrar solo la categoría seleccionada -->
        <template v-else>
          <div class="bg-gray-800">
            <div class="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
              <h2 class="text-2xl font-bold tracking-tight text-white mb-4">{{ getCategoryTitle() }}</h2>
              
              <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <!-- Tarjetas filtradas por categoría -->
                <div v-for="servicio in serviciosPorCategoria(activeCategory)" :key="servicio.id" 
                     class="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                  <!-- Mismo contenido de tarjeta -->
                  <a href="#" class="flex-shrink-0">
                    <div class="w-full h-48 overflow-hidden rounded-t-lg">
                      <img class="w-full h-full object-cover" :src="servicio.imagen" alt="servicio.titulo" />
                    </div>
                  </a>
                  <div class="px-5 py-4 flex-grow flex flex-col">
                    <a href="#" class="mb-auto">
                      <h5 class="text-xl font-semibold tracking-tight text-gray-900 h-14">{{ servicio.titulo }}</h5>
                    </a>
                    <p class="text-sm text-gray-600 mb-3">{{ servicio.descripcion }}</p>
                    <div class="flex items-center mt-2 mb-4">
                      <div class="flex items-center space-x-1 rtl:space-x-reverse">
                        <div v-for="i in 5" :key="i">
                          <svg class="w-4 h-4" :class="i <= servicio.calificacion ? 'text-yellow-300' : 'text-gray-200'" 
                               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                          </svg>
                        </div>
                      </div>
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">{{ servicio.calificacion }}.0</span>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                      <span class="text-3xl font-bold text-gray-900">${{ servicio.precio }}</span>
                      <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Solicitar</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ServiciosPage',
    data() {
      return {
        activeCategory: 'todos',
        servicios: [
          // Categoría: mantenimiento
          {
            id: 1,
            categoria: 'mantenimiento',
            titulo: 'Cambio de aceite y filtro',
            descripcion: 'Incluye aceite sintético, filtro original y revisión de 10 puntos',
            imagen: '/Images/CambioAceiteyFiltro.jpg',
            precio: 1350,
            calificacion: 4
          },
          {
            id: 2,
            categoria: 'mantenimiento',
            titulo: 'Alineación y balanceo',
            descripcion: 'Incluye alineación computarizada y balanceo de las 4 ruedas',
            imagen: '/Images/AlineacionYBalanceo.jpg',
            precio: 850,
            calificacion: 4
          },
          {
            id: 3,
            categoria: 'mantenimiento',
            titulo: 'Cambio de filtro de aire',
            descripcion: 'Filtro de aire original, mejora el rendimiento de combustible',
            imagen: '/Images/LimpiezaFiltroAire.jpg',
            precio: 450,
            calificacion: 4
          },
          {
            id: 4,
            categoria: 'mantenimiento',
            titulo: 'Cambio de filtro de cabina',
            descripcion: 'Mejora la calidad del aire interior eliminando polvo, polen y particulas contaminantes',
            imagen: '/Images/CambioFiltroCabina.jpg',
            precio: 450,
            calificacion: 4
          },
          {
            id: 5,
            categoria: 'mantenimiento',
            titulo: 'Revisión y reposición de líquidos',
            descripcion: 'Verificación de niveles y rellenado de líquidos: limpiaparabrisas, refrigerante, dirección hidráulica y frenos',
            imagen: '/Images/RevisionLiquidos.jpg',
            precio: 450,
            calificacion: 4
          },
          {
            id: 6,
            categoria: 'mantenimiento',
            titulo: 'Revisión de presión de llantas y estado general',
            descripcion: 'Ajuste de presión a valores recomendados y chequeo visual de desgaste o daños en neumáticos',
            imagen: '/Images/RevisionLlantas.jpeg',
            precio: 450,
            calificacion: 4
          },
          {
            id: 7,
            categoria: 'mantenimiento',
            titulo: 'Alineación y balanceo',
            descripcion: 'Alineación de ruedas para evitar desgaste irregular y vibraciones; balanceo para mejorar estabilidad',
            imagen: '/Images/AlineacionYBalanceo.jpg',
            precio: 450,
            calificacion: 4
          },
          {
            id: 8,
            categoria: 'mantenimiento',
            titulo: 'Rotación de neumáticos',
            descripcion: 'Intercambio de posición entre llantas delanteras y traseras para prolongar su vida útil',
            imagen: '/Images/RotacionNeumaticos.jpg',
            precio: 450,
            calificacion: 4
          },
          {
            id: 9,
            categoria: 'mantenimiento',
            titulo: 'Revisión de luces',
            descripcion: 'Verificación de funcionamiento de luces delanteras, traseras, direccionales y luces interiores',
            imagen: '/Images/RevisionLuces.jpg',
            precio: 450,
            calificacion: 4
          },
          
          // Categoría: motor
          {
            id:10 ,
            categoria: 'motor',
            titulo: 'Cambio de bujías',
            descripcion: 'Mejora el rendimiento y arranque del motor con bujías originales',
            imagen: '/Images/CambioBujias.jpg',
            precio: 850,
            calificacion: 5
          },
          {
            id:11 ,
            categoria: 'motor',
            titulo: 'Cambio de correa de distribución',
            descripcion: 'Servicio preventivo clave para evitar daños graves al motor',
            imagen: '/Images/CorreaDistribucion.jpg',
            precio: 2950,
            calificacion: 5
          },
          {
            id:12 ,
            categoria: 'motor',
            titulo: 'Cambio de filtro de combustible',
            descripcion: 'Sustitución del filtro para asegurar flujo limpio de combustible hacia el motor',
            imagen: '/Images/FiltroCombustible.jpg',
            precio: 2950,
            calificacion: 5
          },
          {
            id:13 ,
            categoria: 'motor',
            titulo: 'Limpieza o reemplazo del cuerpo de aceleración',
            descripcion: 'Elimina residuos que afectan la respuesta del acelerador y el rendimiento del motor',
            imagen: '/Images/CuerpoAceleracion.jpg',
            precio: 2950,
            calificacion: 5
          },
          {
            id:14 ,
            categoria: 'motor',
            titulo: 'Revisión bomba de agua',
            descripcion: 'Verificación de fugas o fallas en el sistema de enfriameneto del motor',
            imagen: '/Images/BombaAgua.jpg',
            precio: 2950,
            calificacion: 5
          },
          {
            id:15 ,
            categoria: 'motor',
            titulo: 'Cambio de anticongelante',
            descripcion: 'Sustitución completa del liquido refrigerante para evitar sobrecalentamiento del motor',
            imagen: '/Images/Anticongelante.jpeg',
            precio: 2950,
            calificacion: 5
          },
          {
            id:16 ,
            categoria: 'motor',
            titulo: 'Limpieza de inyectores',
            descripcion: 'Servicio de limpieza profesional para mejorar la automatización del combustible y el rendimiento del motor',
            imagen: '/Images/LimpiezaInyectores.jpg',
            precio: 2950,
            calificacion: 5
          },
          {
            id:17 ,
            categoria: 'motor',
            titulo: 'Revisión del sistema de escape',
            descripcion: 'Detección de fugas, obstrucciones o daños que afecten emisiones o rendimiento',
            imagen: '/Images/SistemaEscape.jpg',
            precio: 2950,
            calificacion: 5
          },
          
          // Categoría: frenos
          {
            id:18 ,
            categoria: 'frenos',
            titulo: 'Cambio de pastillas de freno',
            descripcion: 'Pastillas de freno originales para un frenado seguro y eficiente',
            imagen: '/Images/PastillasFreno.jpg',
            precio: 1250,
            calificacion: 5
          },
          {
            id:19 ,
            categoria: 'frenos',
            titulo: 'Cambio de líquido de frenos',
            descripcion: 'Sustitución del liquido para evitar pérdida de presión y mantener el sistema en condiciones óptimas',
            imagen: '/Images/LiquidoFreno.jpeg',
            precio: 550,
            calificacion: 5
          },
          {
            id:20 ,
            categoria: 'frenos',
            titulo: 'Revisión de discos o tambores',
            descripcion: 'Inspección de desgaste o deformaciones que afecten la capacidad de frenado',
            imagen: '/Images/DiscosTambores.jpg',
            precio: 550,
            calificacion: 5
          },
          {
            id:21 ,
            categoria: 'frenos',
            titulo: 'Revisión de lineas y mangueras de freno',
            descripcion: 'Detección de fugas o deterioro que comprometan la seguridad del sistema de frenado',
            imagen: '/Images/MangueraFreno.jpg',
            precio: 550,
            calificacion: 5
          },
          
          // Categoría: suspensión
          {
            id:22 ,
            categoria: 'suspension',
            titulo: 'Cambio de amortiguadores',
            descripcion: 'Diagnóstico de fugas o pérdida de capcacidad de absorcción de impactos',
            imagen: '/Images/Amortiguadores.jpg',
            precio: 3650,
            calificacion: 5
          },
          {
            id:23 ,
            categoria: 'suspension',
            titulo: 'Revisión de rótulasa, bujes y terminales',
            descripcion: 'Inspección de componentes que afectan la estabilidad y el control del vehículo',
            imagen: '/Images/Rotulas.jpg',
            precio: 1850,
            calificacion: 4
          },
          {
            id:24 ,
            categoria: 'suspension',
            titulo: 'Alineación de dirección',
            descripcion: 'Corrección del ángulo de las ruedas para evitar desgaste irregular y mejorar el manejo',
            imagen: '/Images/AlineacionDireccion.jpeg',
            precio: 3650,
            calificacion: 5
          },
          {
            id:25 ,
            categoria: 'suspension',
            titulo: 'Revisión del sistema de dirección hidráulica',
            descripcion: 'Comprobación de fugas, ruidos o fallas en el sistema que afecen la maniobrabilidad',
            imagen: '/Images/DireccionHidraulica.png',
            precio: 3650,
            calificacion: 5
          },
          {
            id:26 ,
            categoria: 'suspension',
            titulo: 'Revisión de la barra estabilizadora',
            descripcion: 'Inspección de bujes y anclajes que ayudan a mantener la estabilidad en curvas',
            imagen: '/Images/BarraEstabilizadora.jpg',
            precio: 3650,
            calificacion: 5
          },
          {
            id:27 ,
            categoria: 'suspension',
            titulo: 'Inspección de la cremallera de dirección',
            descripcion: 'Revisión de este componente clave para la transmisión del movimiento del volante a las ruedas',
            imagen: '/Images/CremalleraDireccion.jpeg',
            precio: 3650,
            calificacion: 5
          }
        ]
      }
    },
    methods: {
      serviciosPorCategoria(categoria) {
        return this.servicios.filter(servicio => servicio.categoria === categoria);
      },
      getCategoryTitle() {
        switch(this.activeCategory) {
          case 'mantenimiento':
            return 'Mantenimiento básico';
          case 'motor':
            return 'Sistema de motor';
          case 'frenos':
            return 'Sistema de frenos';
          case 'suspension':
            return 'Suspensión y dirección';
          default:
            return 'Servicios';
        }
      }
    }
  }
  </script>