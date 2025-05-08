<!-- src/views/auth/Login.vue -->
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
            <h2 class="text-2xl font-bold">Descubre la experiencia Toyota</h2>
            <p class="mt-2 text-sm opacity-80">Sistema Toyota.</p>
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
                Servicios para Autos
              </p>
            </div>
            
            <!-- Contenedor del formulario -->
            <div class="bg-white p-8 shadow-lg rounded-lg border border-gray-100">
              <h3 class="text-xl font-bold text-gray-900 mb-6">
                Iniciar Sesión
              </h3>
              
              <!-- Formulario -->
              <form @submit.prevent="enviarFormulario(handleLogin)" class="space-y-6">
                <!-- Campo de correo -->
                <CampoValidado
                  id="email"
                  type="email"
                  v-model="formulario.email"
                  :error="errores.email"
                  @update:error="errores.email = $event"
                  @validacion="validacionCampo('email', $event)"
                  @blur="alPerderFoco('email')"
                  label="Correo Electrónico"
                  placeholder="correo@ejemplo.com"
                  required
                  :validator="validarEmail"
                  errorMessage="Por favor ingresa un correo electrónico válido"
                  autocomplete="email"
                >
                  <template #icono>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </template>
                </CampoValidado>

                <!-- Campo de contraseña -->
                <CampoValidado
                  id="password"
                  type="password"
                  v-model="formulario.password"
                  :error="errores.password"
                  @update:error="errores.password = $event"
                  @validacion="validacionCampo('password', $event)"
                  @blur="alPerderFoco('password')"
                  label="Contraseña"
                  placeholder="••••••••"
                  required
                  autocomplete="current-password"
                >
                  <template #icono>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                  </template>
                </CampoValidado>

                <!-- Casilla recordarme y olvido de contraseña -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      id="recordarme"
                      v-model="formulario.recordarme"
                      type="checkbox"
                      class="h-4 w-4 rounded border-gray-300 text-[#EB0A1E] focus:ring-[#EB0A1E]"
                    />
                    <label for="recordarme" class="ml-2 block text-sm text-gray-700">
                      Recordarme
                    </label>
                  </div>
                  
                  <router-link 
                    to="/recuperar-contrasena" 
                    class="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    ¿Olvidaste tu contraseña?
                  </router-link>
                </div>

                <!-- Mensaje de error global -->
                <div v-if="errorGlobal" class="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {{ errorGlobal }}
                </div>

                <!-- Botón de inicio de sesión -->
                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    :disabled="cargando"
                  >
                    <svg v-if="cargando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ cargando ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
                  </button>
                </div>

                <!-- Enlace para registrarse -->
                <div class="text-center">
                  <p class="text-sm text-gray-600">
                    ¿No tienes una cuenta?
                    <router-link
                      to="/registro"
                      class="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Regístrate
                    </router-link>
                  </p>
                </div>
              </form>
            </div>
            
            <!-- Pie de página -->
            <div class="text-center mt-6 text-xs text-gray-500">
              &copy; {{ new Date().getFullYear() }} Toyota.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CampoValidado from '../../components/ui/CampoValidado.vue';
import { validarEmail } from '../../utils/validaciones';
import { useFormulario } from '../../composables/useFormulario';

const router = useRouter();

// Esquema de validación del formulario
const esquemaValidacion = {
  email: {
    requerido: true,
    validador: validarEmail,
    mensajes: {
      requerido: 'El correo electrónico es obligatorio',
      validador: 'Por favor ingresa un correo electrónico válido'
    }
  },
  password: {
    requerido: true,
    mensajes: {
      requerido: 'La contraseña es obligatoria'
    }
  },
  recordarme: {}
};

// Valores iniciales del formulario
const valoresIniciales = {
  email: '',
  password: '',
  recordarme: false
};

// Usar el hook de formulario
const {
  formulario,
  errores,
  cargando,
  exito,
  errorGlobal,
  formularioValido,
  validarCampo,
  validarFormulario,
  alPerderFoco,
  resetearFormulario,
  enviarFormulario
} = useFormulario(esquemaValidacion, valoresIniciales);

// Función para manejar la validación de un campo
const validacionCampo = (campo, esValido) => {
  // Puedes hacer algo adicional aquí si es necesario
  console.log(`Campo ${campo} validado: ${esValido}`);
};

// Función para manejar el inicio de sesión
const handleLogin = async () => {
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Determinar si es un administrador por el correo electrónico
    // Por ejemplo, cualquier correo que contenga "admin" será un administrador
    const isAdmin = formulario.email.toLowerCase().includes('admin');
    
    // Credenciales para guardar en localStorage/sessionStorage
    const userData = {
      name: isAdmin ? 'Administrador' : 'Usuario Toyota',
      email: formulario.email,
      role: isAdmin ? 'admin' : 'user'
    };
    
    // Almacenar token y usuario
    const storage = formulario.recordarme ? localStorage : sessionStorage;
    storage.setItem('auth_token', 'ejemplo-token-' + Math.random().toString(36).substring(2));
    storage.setItem('user', JSON.stringify(userData));
    
    // Actualizar el store
    const authStore = useAuthStore();
    authStore.user = userData;
    
    // Redirigir según el rol
    router.push(isAdmin ? '/admin' : '/Home');
    
    return true;
  } catch (error) {
    throw new Error('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
  }
};
</script>