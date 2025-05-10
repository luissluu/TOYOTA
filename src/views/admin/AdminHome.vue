<template>
    <div class="flex flex-col w-full px-6">
      <!-- Encabezado del Dashboard -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Dashboard Administrativo</h1>
        <p class="text-gray-400 mt-2">Bienvenido al panel de control. Aquí puedes ver un resumen de las operaciones.</p>
      </div>

      <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1 lg:grid-cols-3">
        <!-- Tarjetas de estadísticas rápidas -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-1 hover:bg-gray-750 transition-colors duration-200">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-300">Clientes Totales</p>
              <p class="text-3xl font-semibold text-white">385</p>
              <div class="flex items-center mt-1">
                <svg class="h-4 w-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p class="text-sm text-green-400 ml-1">+12% este mes</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-1 hover:bg-gray-750 transition-colors duration-200">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-red-600 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-300">Ingresos Mensuales</p>
              <p class="text-3xl font-semibold text-white">$48,250</p>
              <div class="flex items-center mt-1">
                <svg class="h-4 w-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p class="text-sm text-green-400 ml-1">+8.2% vs último mes</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-1 hover:bg-gray-750 transition-colors duration-200">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-300">Servicios Completados</p>
              <p class="text-3xl font-semibold text-white">267</p>
              <div class="flex items-center mt-1">
                <svg class="h-4 w-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p class="text-sm text-green-400 ml-1">+5% este mes</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Gráfico principal: Servicios por popularidad -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-2">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl font-bold text-white">Servicios Más Populares</h2>
              <p class="text-sm text-gray-400 mt-1">Distribución de servicios por tipo</p>
            </div>
            <div class="flex space-x-2">
              <button class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">Este Mes</button>
              <button class="px-4 py-2 text-sm bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors duration-200">Este Año</button>
            </div>
          </div>
          
          <!-- Canvas del gráfico -->
          <div class="mt-4" style="height: 350px;">
            <canvas id="serviciosPopularesChart" ref="serviciosPopularesChart"></canvas>
          </div>
        </div>
  
        <!-- Tabla de servicios recientes -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-1">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl font-bold text-white">Servicios Recientes</h2>
              <p class="text-sm text-gray-400 mt-1">Últimos servicios registrados</p>
            </div>
            <button class="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200">Ver Todos</button>
          </div>
          
          <div class="mt-4 space-y-4">
            <div class="bg-gray-700 p-4 rounded-lg hover:bg-gray-650 transition-colors duration-200">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-white font-medium">Cambio de aceite y filtro</p>
                  <div class="flex items-center mt-1">
                    <img class="h-6 w-6 rounded-full" src="https://ui-avatars.com/api/?name=Juan+Perez&background=random" alt="Juan Pérez">
                    <p class="text-sm text-gray-400 ml-2">Juan Pérez</p>
                  </div>
                </div>
                <span class="px-3 py-1 text-xs bg-green-800 text-green-100 rounded-full">Completado</span>
              </div>
              <div class="flex items-center mt-3 text-sm text-gray-400">
                <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hace 2 horas
              </div>
            </div>
            
            <div class="bg-gray-700 p-4 rounded-lg hover:bg-gray-650 transition-colors duration-200">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-white font-medium">Alineación y balanceo</p>
                  <div class="flex items-center mt-1">
                    <img class="h-6 w-6 rounded-full" src="https://ui-avatars.com/api/?name=Maria+Garcia&background=random" alt="María García">
                    <p class="text-sm text-gray-400 ml-2">María García</p>
                  </div>
                </div>
                <span class="px-3 py-1 text-xs bg-yellow-800 text-yellow-100 rounded-full">En proceso</span>
              </div>
              <div class="flex items-center mt-3 text-sm text-gray-400">
                <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hace 4 horas
              </div>
            </div>
            
            <div class="bg-gray-700 p-4 rounded-lg hover:bg-gray-650 transition-colors duration-200">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-white font-medium">Diagnóstico sistema eléctrico</p>
                  <div class="flex items-center mt-1">
                    <img class="h-6 w-6 rounded-full" src="https://ui-avatars.com/api/?name=Roberto+Lopez&background=random" alt="Roberto López">
                    <p class="text-sm text-gray-400 ml-2">Roberto López</p>
                  </div>
                </div>
                <span class="px-3 py-1 text-xs bg-blue-800 text-blue-100 rounded-full">Programado</span>
              </div>
              <div class="flex items-center mt-3 text-sm text-gray-400">
                <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Para hoy, 16:00
              </div>
            </div>
          </div>
        </div>
  
        <!-- Gráfico de ingresos por categoría -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-3">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl font-bold text-white">Ingresos por Categoría</h2>
              <p class="text-sm text-gray-400 mt-1">Tendencia de ingresos por tipo de servicio</p>
            </div>
            <div class="flex space-x-2">
              <button class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">6 Meses</button>
              <button class="px-4 py-2 text-sm bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors duration-200">1 Año</button>
            </div>
          </div>
          
          <!-- Canvas del gráfico -->
          <div class="mt-4" style="height: 350px;">
            <canvas id="ingresosCategoriaChart" ref="ingresosCategoriaChart"></canvas>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'AdminHome',
    setup() {
      const serviciosPopularesChart = ref(null);
      const ingresosCategoriaChart = ref(null);
      
      // Crear el gráfico de servicios más populares al montar el componente
      onMounted(() => {
        // Datos para el gráfico de servicios más populares
        const popularServicesData = {
          labels: [
            'Cambio de aceite', 
            'Alineación y balanceo', 
            'Cambio de bujías',
            'Cambio filtro de aire',
            'Sistema de frenos',
            'Diagnóstico eléctrico',
            'Mantenimiento suspensión'
          ],
          datasets: [{
            label: 'Cantidad de servicios',
            data: [142, 98, 75, 63, 52, 48, 35],
            backgroundColor: [
              '#3B82F6', // blue-500
              '#EF4444', // red-500
              '#10B981', // green-500
              '#F59E0B', // amber-500
              '#8B5CF6', // violet-500
              '#EC4899', // pink-500
              '#6366F1'  // indigo-500
            ],
            borderWidth: 0,
            borderRadius: 4
          }]
        };
  
        // Datos para el gráfico de ingresos por categoría
        const ingresosCategoriasData = {
          labels: [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'
          ],
          datasets: [
            {
              label: 'Mantenimiento básico',
              data: [12500, 13200, 14100, 13800, 15200, 16300],
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Sistema de motor',
              data: [8200, 9100, 8700, 10200, 11500, 12100],
              borderColor: '#EF4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Sistema de frenos',
              data: [6500, 7200, 6800, 7500, 8300, 9200],
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Suspensión y dirección',
              data: [7800, 8100, 9200, 8700, 9600, 10500],
              borderColor: '#F59E0B',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        };
  
        // Crear el gráfico de servicios más populares
        if (serviciosPopularesChart.value) {
          new Chart(serviciosPopularesChart.value, {
            type: 'bar',
            data: popularServicesData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: 'y',
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                  padding: 12,
                  bodyFont: {
                    size: 14
                  },
                  titleFont: {
                    size: 16,
                    weight: 'bold'
                  }
                }
              },
              scales: {
                y: {
                  ticks: {
                    color: '#9CA3AF'
                  },
                  grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                  }
                },
                x: {
                  ticks: {
                    color: '#9CA3AF'
                  },
                  grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                  }
                }
              }
            }
          });
        }
  
        // Crear el gráfico de ingresos por categoría
        if (ingresosCategoriaChart.value) {
          new Chart(ingresosCategoriaChart.value, {
            type: 'line',
            data: ingresosCategoriasData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#D1D5DB',
                    padding: 20,
                    font: {
                      size: 12
                    }
                  }
                },
                tooltip: {
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                  padding: 12,
                  callbacks: {
                    label: function(context) {
                      let label = context.dataset.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('es-MX', { 
                          style: 'currency', 
                          currency: 'MXN' 
                        }).format(context.parsed.y);
                      }
                      return label;
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: '#9CA3AF',
                    callback: function(value) {
                      return '$' + value.toLocaleString('es-MX');
                    }
                  },
                  grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                  }
                },
                x: {
                  ticks: {
                    color: '#9CA3AF'
                  },
                  grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                  }
                }
              }
            }
          });
        }
      });
  
      return {
        serviciosPopularesChart,
        ingresosCategoriaChart
      };
    }
  };
  </script>

  <style>
  .bg-gray-750 {
    background-color: #2d3748;
  }
  .bg-gray-650 {
    background-color: #2d3748;
  }
  </style>