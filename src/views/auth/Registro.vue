<!-- src/views/auth/Registro.vue -->
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
              <form @submit.prevent="enviarFormulario(handleRegister)" class="space-y-6">
                <!-- Nombre -->
                <CampoValidado
                  id="nombre"
                  v-model="formulario.nombre"
                  :error="errores.nombre"
                  @update:error="errores.nombre = $event"
                  @validacion="validacionCampo('nombre', $event)"
                  @blur="alPerderFoco('nombre')"
                  label="Nombre Completo"
                  placeholder="Tu nombre completo"
                  required
                  soloLetras
                  :validator="validarNombre"
                  errorMessage="Por favor ingresa un nombre válido (solo letras)"
                >
                  <template #icono>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                  </template>
                </CampoValidado>

                <!-- Correo -->
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

                <!-- Contraseña -->
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
                  :validator="validarPassword"
                  errorMessage="Debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula y un número"
                  autocomplete="new-password"
                  ayuda="Mínimo 8 caracteres, una mayúscula, una minúscula y un número"
                >
                  <template #icono>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                  </template>
                </CampoValidado>

                <!-- Confirmar Contraseña -->
                <CampoValidado
                  id="passwordConfirm"
                  type="password"
                  v-model="formulario.passwordConfirm"
                  :error="errores.passwordConfirm"
                  @update:error="errores.passwordConfirm = $event"
                  @validacion="validacionCampo('passwordConfirm', $event)"
                  @blur="alPerderFoco('passwordConfirm')"
                  label="Confirmar Contraseña"
                  placeholder="••••••••"
                  required
                  :validator="(valor) => validarConfirmacionPassword(valor, formulario.password)"
                  errorMessage="Las contraseñas no coinciden"
                  autocomplete="new-password"
                >
                  <template #icono>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                  </template>
                </CampoValidado>

                <!-- Mensaje de error global -->
                <div v-if="errorGlobal" class="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {{ errorGlobal }}
                </div>

                <!-- Botón de registro -->
                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    :disabled="cargando || !formularioValido"
                  >
                    <svg v-if="cargando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ cargando ? 'Creando cuenta...' : 'Registrarse' }}
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

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import CampoValidado from '../../components/ui/CampoValidado.vue';
import { validarSoloLetras, validarEmail, validarPassword, validarPasswordsCoinciden } from '../../utils/validaciones';
import { useFormulario } from '../../composables/useFormulario';

const router = useRouter();

// Esquema de validación del formulario
const esquemaValidacion = {
  nombre: {
    requerido: true,
    validador: validarSoloLetras,
    validarInmediato: true,
    mensajes: {
      requerido: 'El nombre es obligatorio',
      validador: 'Por favor ingresa un nombre válido (solo letras)'
    }
  },
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
    validador: validarPassword,
    mensajes: {
      requerido: 'La contraseña es obligatoria',
      validador: 'Debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula y un número'
    }
  },
  passwordConfirm: {
    requerido: true,
    validador: (valor, form) => validarPasswordsCoinciden(valor, form.password),
    mensajes: {
      requerido: 'Por favor, confirma tu contraseña',
      validador: 'Las contraseñas no coinciden'
    }
  }
};

// Valores iniciales del formulario
const valoresIniciales = {
  nombre: '',
  email: '',
  password: '',
  passwordConfirm: ''
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

// Funciones de validación adicionales para usar en los componentes
const validarNombre = (valor) => {
  return validarSoloLetras(valor);
};

const validarConfirmacionPassword = (confirmacion, original) => {
  return validarPasswordsCoinciden(confirmacion, original);
};

// Función para manejar la validación de un campo
const validacionCampo = (campo, esValido) => {
  // Puedes hacer algo adicional aquí si es necesario
  console.log(`Campo ${campo} validado: ${esValido}`);
};

// Función para manejar el registro
const handleRegister = async () => {
  try {
    // Simular llamada a API (en un entorno real, esto sería una petición a tu backend)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simular registro exitoso
    localStorage.setItem('auth_token', 'ejemplo-token-' + Math.random().toString(36).substring(2));
    localStorage.setItem('user', JSON.stringify({
      name: formulario.nombre,
      email: formulario.email
    }));
    
    // Redirigir al dashboard o página principal
    router.push('/');
    
    return true;
  } catch (error) {
    throw new Error('Ha ocurrido un error al registrarse. Por favor, intenta más tarde.');
  }
};

// Observar cambios importantes en el formulario
watch(
  [() => formulario.password, () => formulario.passwordConfirm],
  ([nuevaPassword, nuevaConfirmacion]) => {
    // Si tenemos ambos valores, validamos la confirmación
    if (nuevaPassword && nuevaConfirmacion) {
      validarCampo('passwordConfirm');
    }
  }
);
</script>