<template>
  <div class="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-4 py-12">
    <div 
      class="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center" 
      style="background-image: url('/src/assets/toyota-fondo.webp'); background-blend-mode: overlay;"
    ></div>
    <div 
      class="w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden relative z-10"
    >
      <div class="md:flex">
        <div class="md:w-1/2 hidden md:block relative">
          <div 
            class="absolute inset-0 bg-cover bg-center" 
            style="background-image: url('/src/assets/Logo.png');"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-tr from-[#EB0A1E]/80 to-black/70"></div>
          <div class="absolute bottom-0 left-0 p-8 text-white">
            <h2 class="text-2xl font-bold">Únete a la comunidad Toyota</h2>
            <p class="mt-2 text-sm opacity-80">Regístrate para acceder a todos nuestros servicios.</p>
          </div>
        </div>
        <div class="md:w-1/2 p-6 md:p-8 flex items-center justify-center">
          <div class="w-full max-w-md">
            <!-- Logo y encabezado -->
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center p-2 bg-red-600 rounded-full mb-4">
                <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7 13.5C7 13.22 7.22 13 7.5 13H16.5C16.78 13 17 13.22 17 13.5V14.5C17 14.78 16.78 15 16.5 15H7.5C7.22 15 7 14.78 7 14.5V13.5ZM16.5 11H7.5C7.22 11 7 10.78 7 10.5V9.5C7 9.22 7.22 9 7.5 9H16.5C16.78 9 17 9.22 17 9.5V10.5C17 10.78 16.78 11 16.5 11Z" fill="currentColor"/>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900">Toyota</h2>
              <p class="text-sm text-gray-600 mt-1">
                Soluciones de movilidad para todos
              </p>
            </div>
            
            <!-- Contenedor del formulario -->
            <div class="bg-white p-8 shadow-lg rounded-lg border border-gray-100">
              <h3 class="text-xl font-bold text-gray-900 mb-6">
                Crear Cuenta
              </h3>
              
              <!-- Formulario -->
              <form @submit.prevent="handleRegister" class="space-y-6">
                <!-- Nombre -->
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="name"
                      v-model="name"
                      type="text"
                      placeholder="Tu nombre completo"
                      class="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <!-- Campo de correo -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      v-model="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      class="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <!-- Campo de contraseña -->
                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      v-model="password"
                      type="password"
                      placeholder="••••••••"
                      class="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <!-- Confirmar contraseña -->
                <div>
                  <label for="passwordConfirm" class="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Contraseña
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="passwordConfirm"
                      v-model="passwordConfirm"
                      type="password"
                      placeholder="••••••••"
                      class="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <!-- Mensaje de error -->
                <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {{ error }}
                </div>

                <!-- Botón de registro -->
                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    :disabled="loading"
                  >
                    <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ loading ? 'Creando cuenta...' : 'Registrarse' }}
                  </button>
                </div>

                <!-- Enlace para iniciar sesión -->
                <div class="text-center">
                  <p class="text-sm text-gray-600">
                    ¿Ya tienes una cuenta?
                    <router-link
                      to="/login"
                      class="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Inicia Sesión
                    </router-link>
                  </p>
                </div>
              </form>
            </div>
            
            <!-- Pie de página -->
            <div class="text-center mt-6 text-xs text-gray-500">
              &copy; {{ new Date().getFullYear() }} Toyota. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistroView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      loading: false,
      error: ''
    }
  },
  methods: {
    handleRegister() {
      // Validación básica
      if (this.password !== this.passwordConfirm) {
        this.error = 'Las contraseñas no coinciden';
        return;
      }
      
      if (this.password.length < 6) {
        this.error = 'La contraseña debe tener al menos 6 caracteres';
        return;
      }

      this.loading = true;
      this.error = '';
      
      // Simulamos un proceso de registro
      setTimeout(() => {
        // Aquí iría la llamada real a la API de registro
        
        // Simulamos un registro exitoso
        localStorage.setItem('auth_token', 'ejemplo-token-' + Math.random().toString(36).substring(2));
        localStorage.setItem('user', JSON.stringify({
          name: this.name,
          email: this.email
        }));
        
        // Redirigir al dashboard o página principal
        this.$router.push('/');
        
        this.loading = false;
      }, 1500);
    }
  }
}
</script>