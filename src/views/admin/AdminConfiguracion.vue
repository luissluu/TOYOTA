// src/views/admin/AdminConfiguracion.vue
<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <!-- Encabezado -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold tracking-tight text-white">Configuración del Sistema</h2>
            <p class="text-gray-400 mt-2">Personaliza la configuración de tu taller automotriz</p>
          </div>
          
          <!-- Pestañas de configuración -->
          <div class="mt-6 border-b border-gray-600">
            <nav class="flex space-x-8">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="tabActiva = tab.id" 
                class="px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200 flex items-center" 
                :class="tabActiva === tab.id ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-300'"
              >
                <component :is="tab.icon" class="h-5 w-5 mr-2" />
                {{ tab.name }}
              </button>
            </nav>
          </div>
          
          <!-- Contenido de la pestaña General -->
          <div v-if="tabActiva === 'general'" class="mt-6 bg-gray-700 rounded-lg p-6">
            <h3 class="text-lg font-medium text-white mb-6">Configuración General</h3>
            
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Nombre del Sitio</label>
                  <input 
                    v-model="configuracion.nombreSitio"
                    type="text" 
                    class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Zona Horaria</label>
                  <select 
                    v-model="configuracion.zonaHoraria"
                    class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option v-for="zona in zonasHorarias" :key="zona.value" :value="zona.value">
                      {{ zona.label }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Moneda</label>
                  <select 
                    v-model="configuracion.moneda"
                    class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option v-for="moneda in monedas" :key="moneda.value" :value="moneda.value">
                      {{ moneda.label }}
                    </option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Idioma Predeterminado</label>
                  <select 
                    v-model="configuracion.idioma"
                    class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option v-for="idioma in idiomas" :key="idioma.value" :value="idioma.value">
                      {{ idioma.label }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Horario de Atención</label>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs text-gray-400 mb-1">Apertura</label>
                      <input 
                        v-model="configuracion.horarioApertura"
                        type="time" 
                        class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                    </div>
                    <div>
                      <label class="block text-xs text-gray-400 mb-1">Cierre</label>
                      <input 
                        v-model="configuracion.horarioCierre"
                        type="time" 
                        class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Días Laborables</label>
                  <div class="flex flex-wrap gap-2">
                    <button 
                      v-for="dia in diasSemana" 
                      :key="dia.value"
                      @click="toggleDiaLaborable(dia.value)"
                      class="px-3 py-1 rounded-full text-sm"
                      :class="configuracion.diasLaborables.includes(dia.value) 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'"
                    >
                      {{ dia.label }}
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end space-x-4">
                <button 
                  @click="restaurarConfiguracion"
                  class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Restaurar Valores
                </button>
                <button 
                  @click="guardarConfiguracion"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                >
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar Configuración
                </button>
              </div>
            </div>
          </div>
          
          <!-- Contenido de la pestaña Notificaciones -->
          <div v-if="tabActiva === 'notificaciones'" class="mt-6 bg-gray-700 rounded-lg p-6">
            <h3 class="text-lg font-medium text-white mb-6">Configuración de Notificaciones</h3>
            
            <div class="space-y-6">
              <div v-for="notificacion in notificaciones" :key="notificacion.id" 
                class="flex items-center justify-between p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors duration-200"
              >
                <div>
                  <p class="text-white font-medium">{{ notificacion.titulo }}</p>
                  <p class="text-sm text-gray-300">{{ notificacion.descripcion }}</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="notificacion.activa"
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div class="mt-8">
                <h4 class="text-md font-medium text-white mb-4">Plantillas de Correo</h4>
                <div class="space-y-4">
                  <div v-for="plantilla in plantillasCorreo" :key="plantilla.id"
                    class="bg-gray-600 p-4 rounded-lg hover:bg-gray-500 transition-colors duration-200 cursor-pointer"
                    @click="editarPlantilla(plantilla)"
                  >
                    <div class="flex justify-between items-center">
                      <div>
                        <p class="text-white font-medium">{{ plantilla.titulo }}</p>
                        <p class="text-sm text-gray-300">{{ plantilla.descripcion }}</p>
                      </div>
                      <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end space-x-4">
                <button 
                  @click="restaurarNotificaciones"
                  class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Restaurar Valores
                </button>
                <button 
                  @click="guardarNotificaciones"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                >
                  <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar Configuración
                </button>
              </div>
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
  name: 'AdminConfiguracion',
  setup() {
    const tabActiva = ref('general');
    
    // Datos de configuración general
    const configuracion = ref({
      nombreSitio: 'Toyota Servicios',
      zonaHoraria: 'America/Mexico_City',
      moneda: 'MXN',
      idioma: 'es',
      horarioApertura: '08:00',
      horarioCierre: '18:00',
      diasLaborables: ['lun', 'mar', 'mie', 'jue', 'vie']
    });

    // Datos de notificaciones
    const notificaciones = ref([
      {
        id: 1,
        titulo: 'Correos de Bienvenida',
        descripcion: 'Enviar correo de bienvenida a nuevos usuarios',
        activa: true
      },
      {
        id: 2,
        titulo: 'Notificaciones de Servicio',
        descripcion: 'Enviar alertas sobre el estado de los servicios',
        activa: true
      },
      {
        id: 3,
        titulo: 'Recordatorios de Mantenimiento',
        descripcion: 'Enviar recordatorios de mantenimiento programado',
        activa: true
      },
      {
        id: 4,
        titulo: 'Notificaciones de Marketing',
        descripcion: 'Enviar ofertas y promociones',
        activa: false
      }
    ]);

    // Datos de plantillas de correo
    const plantillasCorreo = ref([
      {
        id: 1,
        titulo: 'Bienvenida',
        descripcion: 'Correo enviado a nuevos usuarios'
      },
      {
        id: 2,
        titulo: 'Confirmación de Servicio',
        descripcion: 'Correo de confirmación de servicio programado'
      },
      {
        id: 3,
        titulo: 'Recordatorio de Mantenimiento',
        descripcion: 'Recordatorio de mantenimiento programado'
      }
    ]);

    // Datos de opciones
    const zonasHorarias = [
      { value: 'America/Mexico_City', label: 'América/Ciudad_de_México (GMT-6)' },
      { value: 'America/Los_Angeles', label: 'América/Los_Angeles (GMT-8)' },
      { value: 'America/New_York', label: 'América/Nueva_York (GMT-5)' },
      { value: 'Europe/Madrid', label: 'Europa/Madrid (GMT+1)' },
      { value: 'Asia/Tokyo', label: 'Asia/Tokio (GMT+9)' }
    ];

    const monedas = [
      { value: 'MXN', label: 'MXN - Peso Mexicano' },
      { value: 'USD', label: 'USD - Dólar Estadounidense' },
      { value: 'EUR', label: 'EUR - Euro' },
      { value: 'JPY', label: 'JPY - Yen Japonés' }
    ];

    const idiomas = [
      { value: 'es', label: 'Español' },
      { value: 'en', label: 'Inglés' },
      { value: 'fr', label: 'Francés' },
      { value: 'ja', label: 'Japonés' }
    ];

    const diasSemana = [
      { value: 'lun', label: 'Lun' },
      { value: 'mar', label: 'Mar' },
      { value: 'mie', label: 'Mié' },
      { value: 'jue', label: 'Jue' },
      { value: 'vie', label: 'Vie' },
      { value: 'sab', label: 'Sáb' },
      { value: 'dom', label: 'Dom' }
    ];

    const tabs = [
      { id: 'general', name: 'General', icon: 'SettingsIcon' },
      { id: 'notificaciones', name: 'Notificaciones', icon: 'BellIcon' }
    ];

    // Funciones
    const toggleDiaLaborable = (dia) => {
      const index = configuracion.value.diasLaborables.indexOf(dia);
      if (index === -1) {
        configuracion.value.diasLaborables.push(dia);
      } else {
        configuracion.value.diasLaborables.splice(index, 1);
      }
    };

    const guardarConfiguracion = () => {
      // Implementar guardado de configuración
      console.log('Guardando configuración:', configuracion.value);
    };

    const restaurarConfiguracion = () => {
      // Implementar restauración de configuración
      console.log('Restaurando configuración');
    };

    const guardarNotificaciones = () => {
      // Implementar guardado de notificaciones
      console.log('Guardando notificaciones:', notificaciones.value);
    };

    const restaurarNotificaciones = () => {
      // Implementar restauración de notificaciones
      console.log('Restaurando notificaciones');
    };

    const editarPlantilla = (plantilla) => {
      // Implementar edición de plantilla
      console.log('Editando plantilla:', plantilla);
    };

    return {
      tabActiva,
      configuracion,
      notificaciones,
      plantillasCorreo,
      zonasHorarias,
      monedas,
      idiomas,
      diasSemana,
      tabs,
      toggleDiaLaborable,
      guardarConfiguracion,
      restaurarConfiguracion,
      guardarNotificaciones,
      restaurarNotificaciones,
      editarPlantilla
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