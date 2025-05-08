<template>
    <!-- Diseño de autenticación (login, registro, recuperación) -->
    <div v-if="isAuthRoute" class="min-h-screen w-full">
        <!-- Solo se muestra la vista de autenticación -->
        <router-view></router-view>
    </div>

        <!-- Diseño de administrador -->
        <div v-else-if="isAdminRoute">
        <!-- Mostrar la vista del administrador -->
        <router-view></router-view>
    </div>

    <!-- Diseño principal con barra lateral y superior -->
    <div v-else class="relative min-h-screen lg:flex">
        <!-- Barra superior en móvil -->
        <header class="text-gray-100 bg-gray-800 lg:hidden">
            <div class="container flex items-center justify-between p-4 mx-auto">
                <router-link to="/" class="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                </router-link>
                
                <button @click="isOpen = !isOpen" class="p-2 text-white rounded-lg focus:outline-none hover:bg-gray-700">
                    <svg v-show="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
    
                    <svg v-show="isOpen" class="w-6 h-6 transition duration-200 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </header>

        <div v-cloak :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false" class="fixed inset-0 z-20 transition-opacity bg-black opacity-30 lg:hidden"></div>

        <!-- Barra lateral -->
        <aside id="sidebar" :class="isOpen ? 'translate-x-0 ease-in' : '-translate-x-full ease-out'" class="fixed inset-y-0 left-0 z-30 flex flex-col w-[4.5rem] min-h-screen space-y-6 overflow-y-auto text-gray-100 transition duration-200 transform bg-black lg:translate-x-0 lg:relative lg:inset-0">
            <div class="flex flex-col items-center flex-1 space-y-6">
                <router-link to="/" class="flex items-center justify-center w-full p-5 lg:p-0 lg:h-20 font-bold text-white truncate bg-red-600 whitespace-nowrap">
                    <img src="/Images/Logo.png" alt="Logo" class="w-17 h-17">
                </router-link>

                <nav class="flex flex-col items-center space-y-6">
                    <!-- Enlace a Home (Inicio) -->
                    <router-link to="/Home" exact class="p-3 transition-colors duration-300 rounded-lg" :class="{ 'bg-white': $route.path === '/Home', 'hover:bg-white': $route.path !== '/Home' }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" :class="{ 'stroke-blue-700': $route.path === '/Home', 'stroke-gray-100 group-hover:stroke-blue-700': $route.path !== '/Home' }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </router-link>

                    <!-- Enlace a Servicios -->
                    <router-link to="/Servicios" class="p-2 transition-colors duration-300 rounded-lg group" :class="{ 'bg-white': $route.path === '/Servicios', 'hover:bg-white': $route.path !== '/Servicios' }">
                        <svg class="w-5 h-5" :class="{ 'stroke-blue-700': $route.path === '/Servicios', 'stroke-gray-100 group-hover:stroke-blue-700': $route.path !== '/Servicios' }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                        </svg>
                    </router-link>

                    <!-- Enlace a Documentos -->
                    <router-link to="/Historial" class="p-2 transition-colors duration-300 rounded-lg group" :class="{ 'bg-white': $route.path === '/Historial', 'hover:bg-white': $route.path !== '/Historial' }">
                        <svg class="w-5 h-5" :class="{ 'stroke-blue-700': $route.path === '/Historial', 'stroke-gray-100 group-hover:stroke-blue-700': $route.path !== '/Historial' }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" />
                            <path d="M13 2V9H20" />
                        </svg>
                    </router-link>
                </nav>
            </div>

            <div class="flex justify-center py-5 border-t border-gray-600">
                <!-- Enlace a Configuración -->
                <router-link to="/configuracion" class="p-2 transition-colors duration-300 rounded-lg group" :class="{ 'bg-white': $route.path === '/configuracion', 'hover:bg-white': $route.path !== '/configuracion' }">
                    <svg class="w-5 h-5" :class="{ 'stroke-blue-700': $route.path === '/configuracion', 'stroke-gray-100 group-hover:stroke-blue-700': $route.path !== '/configuracion' }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
                        <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z" />
                    </svg>
                </router-link>
            </div>
        </aside>

        <!-- Contenido principal con barra superior -->
        <main id="content" class="flex-1 pb-12 space-y-6 overflow-y-auto bg-gray-800 lg:h-screen md:space-y-8">
            <header class="flex items-center justify-between h-20 px-6 bg-gray-800 border-b">
                <div class="relative flex items-center">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    </span>
                </div>

                <div class="flex items-center">
                    <div class="relative">
                        <button class="transition-colors duration-300 rounded-lg sm:px-4 sm:py-2 focus:outline-none hover:bg-gray-100" @click="dropdownOpen = !dropdownOpen">
                            <span class="sr-only">User Menu</span>
                            <div class="flex items-center md:-mx-2 ">
                                <div class="hidden md:mx-2 md:flex md:flex-col md:items-end md:leading-tight">
                                    <span class="font-semibold text-sm text-gray-800">Luis</span>
                                    <span class="text-sm text-gray-600">Lua</span>
                                </div>

                                <img class="flex-shrink-0 w-10 h-10 overflow-hidden bg-gray-100 rounded-full md:mx-2" src="https://randomuser.me/api/portraits/men/68.jpg" alt="user profile photo" >
                            </div>
                        </button>
                        
                        <transition
                            enter-active-class="transition duration-200 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <div class="absolute right-0 z-50 w-56 p-2 bg-white border rounded-lg top-16 lg:top-20" v-show="dropdownOpen">
                                <router-link to="/perfil" class="block px-4 py-2 text-gray-800 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100" @click="dropdownOpen = false">Perfil</router-link>
                                <div @click="showPasswordModal = true; dropdownOpen = false" class="px-4 py-2 text-gray-800 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100">Cambiar contraseña</div>
                            </div>
                        </transition>
                    </div>

                    <div v-show="dropdownOpen" class="fixed inset-0 z-30" @click="dropdownOpen = false"></div>

                    <button class="relative p-2 mx-3 text-gray-400 transition-colors duration-300 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100">
                        <span class="sr-only">Notifications</span>
                        <span class="absolute top-0 right-0 w-2 h-2 mt-1 mr-2 bg-blue-700 rounded-full"></span>
                        <span class="absolute top-0 right-0 w-2 h-2 mt-1 mr-2 bg-blue-700 rounded-full animate-ping"></span>
                        
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>

                    <!-- Botón de cerrar sesión con evento para redirigir a login -->
                    <button 
                        @click="cerrarSesion" 
                        class="p-2 text-gray-400 transition-colors duration-300 rounded-full focus:outline-none hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100"
                    >
                        <span class="sr-only">Cerrar sesión</span>
                        
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </header>

            <!-- Aquí se renderizará el contenido de cada página -->
            <router-view>
                
            </router-view>
        </main>
    </div>

    <div v-if="showPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 border border-gray-700">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold text-white">Cambiar contraseña</h3>
      <button @click="showPasswordModal = false" class="text-gray-400 hover:text-white">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Primera fase: verificar contraseña actual -->
    <div v-if="passwordStep === 1">
      <p class="text-gray-300 mb-4">Por favor ingresa tu contraseña actual para continuar</p>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-400 mb-1">Contraseña actual</label>
        <input 
          type="password" 
          v-model="currentPassword" 
          class="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingresa tu contraseña actual"
        >
        <p v-if="passwordError" class="mt-1 text-sm text-red-500">{{ passwordError }}</p>
      </div>
      
      <div class="flex justify-end space-x-3">
        <button @click="showPasswordModal = false" class="px-4 py-2 text-gray-300 hover:text-white">
          Cancelar
        </button>
        <button 
          @click="verifyCurrentPassword" 
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          :disabled="!currentPassword"
        >
          Continuar
        </button>
      </div>
    </div>
    
    <!-- Segunda fase: ingresar nueva contraseña -->
    <div v-if="passwordStep === 2">
      <p class="text-gray-300 mb-4">Ingresa tu nueva contraseña</p>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-400 mb-1">Nueva contraseña</label>
        <input 
          type="password" 
          v-model="newPassword" 
          class="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingresa tu nueva contraseña"
        >
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-400 mb-1">Confirmar nueva contraseña</label>
        <input 
          type="password" 
          v-model="confirmPassword" 
          class="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Confirma tu nueva contraseña"
        >
        <p v-if="passwordError" class="mt-1 text-sm text-red-500">{{ passwordError }}</p>
      </div>
      
      <div class="flex justify-end space-x-3">
        <button @click="passwordStep = 1" class="px-4 py-2 text-gray-300 hover:text-white">
          Atrás
        </button>
        <button 
          @click="changePassword" 
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          :disabled="!newPassword || !confirmPassword"
        >
          Cambiar contraseña
        </button>
      </div>
    </div>
    
    <!-- Tercera fase: confirmación -->
    <div v-if="passwordStep === 3" class="text-center py-4">
      <div class="flex justify-center mb-4">
        <svg class="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="text-xl font-medium text-white mb-2">¡Contraseña actualizada!</h3>
      <p class="text-gray-300 mb-4">Tu contraseña ha sido cambiada exitosamente.</p>
      <button 
        @click="closePasswordModal"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
      >
        Cerrar
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false,
            dropdownOpen: false,
            // Variables para el modal de cambio de contraseña
            showPasswordModal: false,
            passwordStep: 1,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            passwordError: ''
        }
    },
    computed: {
        // Detectar si estamos en una ruta de autenticación
        isAuthRoute() {
            // Lista de rutas de autenticación
            return this.$route.meta.layout === 'auth';
        },
        // Detectar si estamos en una ruta de administrador
        isAdminRoute() {
            // Verifica si la ruta actual comienza con '/admin'
            return this.$route.path.startsWith('/admin');
        }
    },
    methods: {
        // Método para cerrar sesión y redirigir a login
        cerrarSesion() {
            // 1. Limpiar datos de autenticación
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            sessionStorage.removeItem('auth_token');
            sessionStorage.removeItem('user');
            
            // 2. Redirigir al login
            this.$router.push('/login');
        },

        
        // Métodos existentes...
        verifyCurrentPassword() {
            // Aquí iría la lógica para verificar la contraseña actual con el backend
            // Por ahora, simulamos una verificación exitosa
            if (this.currentPassword === '') {
                this.passwordError = 'Por favor ingresa tu contraseña actual';
                return;
            }
            
            // Para demostración, consideraremos "luis1885" como la contraseña correcta
            if (this.currentPassword === 'luis1885') {
                this.passwordError = '';
                this.passwordStep = 2;
            } else {
                this.passwordError = 'Contraseña incorrecta';
            }
        },
        changePassword() {
            // Validación de las contraseñas
            if (this.newPassword.length < 8) {
                this.passwordError = 'La contraseña debe tener al menos 8 caracteres';
                return;
            }
            
            if (this.newPassword !== this.confirmPassword) {
                this.passwordError = 'Las contraseñas no coinciden';
                return;
            }
            
            // Aquí iría la lógica para actualizar la contraseña en el backend
            // Por ahora, simulamos una actualización exitosa
            this.passwordError = '';
            this.passwordStep = 3;
        },
        closePasswordModal() {
            // Reiniciar el modal
            this.showPasswordModal = false;
            this.passwordStep = 1;
            this.currentPassword = '';
            this.newPassword = '';
            this.confirmPassword = '';
            this.passwordError = '';
        }
    }
}
</script>