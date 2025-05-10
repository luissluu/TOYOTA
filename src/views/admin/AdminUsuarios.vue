// src/views/admin/AdminUsuarios.vue
<template>
  <div class="flex flex-col w-full px-6">
    <section class="grid grid-cols-1 gap-8 px-8 md:grid-cols-1">
      <div class="bg-gray-800 md:col-span-1">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold tracking-tight text-white">Gestión de Usuarios</h2>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input 
                  type="text" 
                  v-model="busqueda" 
                  placeholder="Buscar usuario..." 
                  class="w-64 rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <svg class="absolute left-3 top-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button 
                @click="mostrarFormulario = true" 
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
              >
                <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Añadir Usuario
              </button>
            </div>
          </div>
          
          <!-- Filtros -->
          <div class="flex flex-wrap gap-4 mb-6">
            <select 
              v-model="filtroRol" 
              class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los roles</option>
              <option value="admin">Administrador</option>
              <option value="mecanico">Mecánico</option>
              <option value="recepcionista">Recepcionista</option>
              <option value="usuario">Usuario</option>
            </select>
            
            <select 
              v-model="filtroEstado" 
              class="rounded-md bg-gray-600 border-gray-500 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="pendiente">Pendiente</option>
            </select>
          </div>
          
          <!-- Tabla de usuarios -->
          <div class="bg-gray-700 rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-600">
                <thead class="bg-gray-800">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rol</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Último Acceso</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-gray-700 divide-y divide-gray-600">
                  <tr v-for="usuario in usuariosFiltrados" :key="usuario.id" class="hover:bg-gray-600 transition-colors duration-200">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ usuario.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img class="h-10 w-10 rounded-full" :src="usuario.avatar" :alt="usuario.nombre">
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-white">{{ usuario.nombre }}</div>
                          <div class="text-sm text-gray-400">{{ usuario.cargo }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-white">{{ usuario.email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        :class="{
                          'bg-purple-100 text-purple-800': usuario.rol === 'admin',
                          'bg-blue-100 text-blue-800': usuario.rol === 'mecanico',
                          'bg-green-100 text-green-800': usuario.rol === 'recepcionista',
                          'bg-gray-100 text-gray-800': usuario.rol === 'usuario'
                        }"
                      >
                        {{ usuario.rol }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        :class="{
                          'bg-green-100 text-green-800': usuario.estado === 'activo',
                          'bg-red-100 text-red-800': usuario.estado === 'inactivo',
                          'bg-yellow-100 text-yellow-800': usuario.estado === 'pendiente'
                        }"
                      >
                        {{ usuario.estado }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {{ usuario.ultimoAcceso }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex space-x-3">
                        <button 
                          @click="editarUsuario(usuario)" 
                          class="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          @click="confirmarEliminacion(usuario)" 
                          class="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <button 
                          @click="verDetalles(usuario)" 
                          class="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación -->
            <div class="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Anterior
                </button>
                <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Siguiente
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-400">
                    Mostrando
                    <span class="font-medium">{{ paginacion.desde }}</span>
                    a
                    <span class="font-medium">{{ paginacion.hasta }}</span>
                    de
                    <span class="font-medium">{{ paginacion.total }}</span>
                    resultados
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button 
                      @click="cambiarPagina(paginacion.paginaActual - 1)"
                      :disabled="paginacion.paginaActual === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Anterior</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      v-for="pagina in paginacion.totalPaginas" 
                      :key="pagina"
                      @click="cambiarPagina(pagina)"
                      :class="[
                        'relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium',
                        pagina === paginacion.paginaActual 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      ]"
                    >
                      {{ pagina }}
                    </button>
                    <button 
                      @click="cambiarPagina(paginacion.paginaActual + 1)"
                      :disabled="paginacion.paginaActual === paginacion.totalPaginas"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Siguiente</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal para añadir/editar usuario -->
    <div v-if="mostrarFormulario" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50" @click="mostrarFormulario = false"></div>
      <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6">
        <button @click="mostrarFormulario = false" class="absolute top-4 right-4 text-gray-400 hover:text-white">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h3 class="text-xl font-medium text-white mb-4">{{ usuarioSeleccionado ? 'Editar Usuario' : 'Añadir Nuevo Usuario' }}</h3>
        
        <form @submit.prevent="guardarUsuario" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
            <input 
              type="text" 
              v-model="formulario.nombre" 
              class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              v-model="formulario.email" 
              class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Cargo</label>
            <input 
              type="text" 
              v-model="formulario.cargo" 
              class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Rol</label>
            <select 
              v-model="formulario.rol" 
              class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Administrador</option>
              <option value="mecanico">Mecánico</option>
              <option value="recepcionista">Recepcionista</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>
          
          <div v-if="!usuarioSeleccionado">
            <label class="block text-sm font-medium text-gray-400 mb-1">Contraseña</label>
            <input 
              type="password" 
              v-model="formulario.password" 
              class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Estado</label>
            <select 
              v-model="formulario.estado" 
              class="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="pendiente">Pendiente</option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              @click="mostrarFormulario = false" 
              class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              {{ usuarioSeleccionado ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación para eliminar -->
    <div v-if="mostrarConfirmacion" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50" @click="mostrarConfirmacion = false"></div>
      <div class="relative bg-gray-800 max-w-md w-full mx-auto rounded-lg shadow-lg p-6">
        <h3 class="text-xl font-medium text-white mb-4">Confirmar Eliminación</h3>
        <p class="text-gray-400 mb-6">¿Estás seguro de que deseas eliminar al usuario {{ usuarioAEliminar?.nombre }}? Esta acción no se puede deshacer.</p>
        
        <div class="flex justify-end space-x-3">
          <button 
            @click="mostrarConfirmacion = false" 
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button 
            @click="eliminarUsuario" 
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'AdminUsuarios',
  setup() {
    const mostrarFormulario = ref(false);
    const mostrarConfirmacion = ref(false);
    const usuarioSeleccionado = ref(null);
    const usuarioAEliminar = ref(null);
    const busqueda = ref('');
    const filtroRol = ref('');
    const filtroEstado = ref('');

    const formulario = ref({
      nombre: '',
      email: '',
      cargo: '',
      rol: '',
      password: '',
      estado: 'activo'
    });

    // Datos de ejemplo
    const usuarios = ref([
      {
        id: '#001',
        nombre: 'Luis González',
        email: 'luis@ejemplo.com',
        cargo: 'Mecánico Senior',
        rol: 'mecanico',
        estado: 'activo',
        ultimoAcceso: '2024-03-15 14:30',
        avatar: 'https://ui-avatars.com/api/?name=Luis+Gonzalez&background=random'
      },
      {
        id: '#002',
        nombre: 'María García',
        email: 'maria@ejemplo.com',
        cargo: 'Recepcionista',
        rol: 'recepcionista',
        estado: 'activo',
        ultimoAcceso: '2024-03-15 13:45',
        avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=random'
      },
      {
        id: '#003',
        nombre: 'Carlos Rodríguez',
        email: 'carlos@ejemplo.com',
        cargo: 'Mecánico',
        rol: 'mecanico',
        estado: 'pendiente',
        ultimoAcceso: '2024-03-14 16:20',
        avatar: 'https://ui-avatars.com/api/?name=Carlos+Rodriguez&background=random'
      }
    ]);

    const paginacion = ref({
      paginaActual: 1,
      totalPaginas: 3,
      desde: 1,
      hasta: 3,
      total: 25
    });

    const usuariosFiltrados = computed(() => {
      return usuarios.value.filter(usuario => {
        const coincideBusqueda = usuario.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
                                usuario.email.toLowerCase().includes(busqueda.value.toLowerCase());
        const coincideRol = !filtroRol.value || usuario.rol === filtroRol.value;
        const coincideEstado = !filtroEstado.value || usuario.estado === filtroEstado.value;
        
        return coincideBusqueda && coincideRol && coincideEstado;
      });
    });

    const editarUsuario = (usuario) => {
      usuarioSeleccionado.value = usuario;
      formulario.value = { ...usuario };
      mostrarFormulario.value = true;
    };

    const confirmarEliminacion = (usuario) => {
      usuarioAEliminar.value = usuario;
      mostrarConfirmacion.value = true;
    };

    const eliminarUsuario = () => {
      // Aquí iría la lógica para eliminar el usuario
      usuarios.value = usuarios.value.filter(u => u.id !== usuarioAEliminar.value.id);
      mostrarConfirmacion.value = false;
      usuarioAEliminar.value = null;
    };

    const guardarUsuario = () => {
      if (usuarioSeleccionado.value) {
        // Actualizar usuario existente
        const index = usuarios.value.findIndex(u => u.id === usuarioSeleccionado.value.id);
        if (index !== -1) {
          usuarios.value[index] = { ...usuarios.value[index], ...formulario.value };
        }
      } else {
        // Crear nuevo usuario
        const nuevoUsuario = {
          id: `#${String(usuarios.value.length + 1).padStart(3, '0')}`,
          ...formulario.value,
          ultimoAcceso: new Date().toLocaleString(),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formulario.value.nombre)}&background=random`
        };
        usuarios.value.push(nuevoUsuario);
      }
      
      mostrarFormulario.value = false;
      usuarioSeleccionado.value = null;
      formulario.value = {
        nombre: '',
        email: '',
        cargo: '',
        rol: '',
        password: '',
        estado: 'activo'
      };
    };

    const cambiarPagina = (pagina) => {
      paginacion.value.paginaActual = pagina;
      // Aquí iría la lógica para cargar los datos de la nueva página
    };

    const verDetalles = (usuario) => {
      // Implementar vista de detalles
      console.log('Ver detalles de:', usuario);
    };

    return {
      mostrarFormulario,
      mostrarConfirmacion,
      usuarioSeleccionado,
      usuarioAEliminar,
      busqueda,
      filtroRol,
      filtroEstado,
      formulario,
      usuarios,
      usuariosFiltrados,
      paginacion,
      editarUsuario,
      confirmarEliminacion,
      eliminarUsuario,
      guardarUsuario,
      cambiarPagina,
      verDetalles
    };
  }
};
</script>