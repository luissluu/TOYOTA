// src/views/admin/AdminConfiguracion.vue
<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">Configuración del Sistema</h2>
          
          <!-- Pestañas de configuración -->
          <div class="mt-6 border-b border-gray-600">
            <nav class="flex space-x-8">
              <button 
                @click="tabActiva = 'general'" 
                class="px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200" 
                :class="tabActiva === 'general' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-300'"
              >
                General
              </button>
              <button 
                @click="tabActiva = 'notificaciones'" 
                class="px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200" 
                :class="tabActiva === 'notificaciones' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-300'"
              >
                Notificaciones
              </button>
              <button 
                @click="tabActiva = 'seguridad'" 
                class="px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200" 
                :class="tabActiva === 'seguridad' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-300'"
              >
                Seguridad
              </button>
              <button 
                @click="tabActiva = 'avanzado'" 
                class="px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200" 
                :class="tabActiva === 'avanzado' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-300'"
              >
                Configuración Avanzada
              </button>
            </nav>
          </div>
          
          <!-- Contenido de la pestaña General -->
          <div v-if="tabActiva === 'general'" class="mt-6 bg-gray-700 rounded-lg p-6">
            <h3 class="text-lg font-medium text-white mb-6">Configuración General</h3>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Nombre del Sitio</label>
                <input type="text" value="Toyota Servicios" class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Zona Horaria</label>
                <select class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>América/Ciudad_de_México (GMT-6)</option>
                  <option>América/Los_Angeles (GMT-8)</option>
                  <option>América/Nueva_York (GMT-5)</option>
                  <option>Europa/Madrid (GMT+1)</option>
                  <option>Asia/Tokio (GMT+9)</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Moneda</label>
                <select class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>MXN - Peso Mexicano</option>
                  <option>USD - Dólar Estadounidense</option>
                  <option>EUR - Euro</option>
                  <option>JPY - Yen Japonés</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Idioma Predeterminado</label>
                <select class="w-full bg-gray-600 border-gray-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Español</option>
                  <option>Inglés</option>
                  <option>Francés</option>
                  <option>Japonés</option>
                </select>
              </div>
              
              <div class="flex justify-end">
                <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Guardar Configuración
                </button>
              </div>
            </div>
          </div>
          
          <!-- Contenido de la pestaña Notificaciones -->
          <div v-if="tabActiva === 'notificaciones'" class="mt-6 bg-gray-700 rounded-lg p-6">
            <h3 class="text-lg font-medium text-white mb-6">Configuración de Notificaciones</h3>
            
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-white font-medium">Correos de Bienvenida</p>
                  <p class="text-sm text-gray-300">Enviar correo de bienvenida a nuevos usuarios</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" checked>
                  <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-white font-medium">Notificaciones de Servicio</p>
                  <p class="text-sm text-gray-300">Enviar alertas sobre el estado de los servicios</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" checked>
                  <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-white font-medium">Recordatorios de Mantenimiento</p>
                  <p class="text-sm text-gray-300">Enviar recordatorios de mantenimiento programado</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" checked>
                  <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-white font-medium">Notificaciones de Marketing</p>
                  <p class="text-sm text-gray-300">Enviar ofertas y promociones</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div class="flex justify-end">
                <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Guardar Configuración
                </button>
              </div>
            </div>
          </div>
          
          <!-- Contenido para otras pestañas... -->
          <div v-if="tabActiva === 'seguridad'" class="mt-6 bg-gray-700 rounded-lg p-6">
            <h3 class="text-lg font-medium text-white mb-6">Configuración de Seguridad</h3>
            <!-- Contenido de seguridad -->
            <p class="text-gray-300">Contenido de configuración de seguridad en desarrollo...</p>
          </div>
          
          <div v-if="tabActiva === 'avanzado'" class="mt-6 bg-gray-700 rounded-lg p-6">
            <h3 class="text-lg font-medium text-white mb-6">Configuración Avanzada</h3>
            <!-- Contenido avanzado -->
            <p class="text-gray-300">Contenido de configuración avanzada en desarrollo...</p>
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
    
    return {
      tabActiva
    };
  }
};
</script>