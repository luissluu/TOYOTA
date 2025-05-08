// src/views/admin/AdminReportes.vue
<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Reportes y Estadísticas</h2>
          
          <!-- Tarjetas de estadísticas -->
          <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div class="bg-gray-700 p-5 rounded-lg shadow-sm">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div class="ml-5">
                  <p class="text-sm font-medium text-gray-300">Clientes Totales</p>
                  <p class="text-3xl font-semibold text-white">385</p>
                  <p class="text-sm text-green-400">+12% este mes</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-700 p-5 rounded-lg shadow-sm">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-red-600 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-5">
                  <p class="text-sm font-medium text-gray-300">Ingresos Mensuales</p>
                  <p class="text-3xl font-semibold text-white">$48,250</p>
                  <p class="text-sm text-green-400">+8.2% vs último mes</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-700 p-5 rounded-lg shadow-sm">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div class="ml-5">
                  <p class="text-sm font-medium text-gray-300">Servicios Completados</p>
                  <p class="text-3xl font-semibold text-white">267</p>
                  <p class="text-sm text-green-400">+5% este mes</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Gráficos -->
          <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- Gráfico 1: Servicios Populares -->
            <div class="bg-gray-700 p-6 rounded-lg shadow-lg">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">Servicios Más Populares</h3>
                <div class="flex space-x-2">
                  <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">Este Mes</button>
                  <button class="px-3 py-1 text-sm bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500">Este Año</button>
                </div>
              </div>
              
              // src/views/admin/AdminReportes.vue (continuación)
              <!-- Contenedor para el gráfico -->
              <div class="mt-4" style="height: 300px;">
                <canvas id="serviciosPopularesChart" ref="serviciosPopularesChart"></canvas>
              </div>
            </div>
            
            <!-- Gráfico 2: Ingresos por Categoría -->
            <div class="bg-gray-700 p-6 rounded-lg shadow-lg">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">Ingresos por Categoría</h3>
                <div class="flex space-x-2">
                  <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">Mensual</button>
                  <button class="px-3 py-1 text-sm bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500">Anual</button>
                </div>
              </div>
              
              <!-- Contenedor para el gráfico -->
              <div class="mt-4" style="height: 300px;">
                <canvas id="ingresosCategoriaChart" ref="ingresosCategoriaChart"></canvas>
              </div>
            </div>
          </div>
          
          <!-- Tabla de últimos reportes -->
          <div class="mt-8 bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 class="text-lg font-semibold text-white mb-4">Últimos Reportes Generados</h3>
            
            <div class="overflow-x-auto">
              <table class="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                <thead class="bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Reporte</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Generado Por</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-500">
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Reporte de Ventas Mensual</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Admin System</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">05/05/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Ver</button>
                      <button class="text-green-400 hover:text-green-300 mr-2">Descargar</button>
                    </td>
                  </tr>
                  
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Análisis de Clientes</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Admin System</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">03/05/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Ver</button>
                      <button class="text-green-400 hover:text-green-300 mr-2">Descargar</button>
                    </td>
                  </tr>
                  
                  <tr class="hover:bg-gray-500">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Servicios Más Solicitados</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">Admin System</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">01/05/2025</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">Ver</button>
                      <button class="text-green-400 hover:text-green-300 mr-2">Descargar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'AdminReportes',
  setup() {
    const serviciosPopularesChart = ref(null);
    const ingresosCategoriaChart = ref(null);
    
    // Crear los gráficos al montar el componente
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