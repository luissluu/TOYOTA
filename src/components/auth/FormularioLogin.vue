<!-- src/components/auth/FormularioLogin.vue -->
<template>
    <form @submit.prevent="iniciarSesion" class="space-y-6">
      <div>
        <CampoValidado
          id="correo"
          v-model="formulario.correo"
          type="email"
          autocomplete="email"
          label="Correo Electrónico"
          placeholder="correo@ejemplo.com"
          :error="errores.correo"
          @update:error="errores.correo = $event"
          @validacion="validacionCampo('correo', $event)"
          @blur="alPerderFoco('correo')"
          required
          :validator="validarEmail"
          errorMessage="Por favor ingresa un correo electrónico válido"
        >
          <template #icono>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </template>
        </CampoValidado>
      </div>
  
      <div>
        <CampoValidado
          id="contrasena"
          v-model="formulario.contrasena"
          type="password"
          autocomplete="current-password"
          label="Contraseña"
          placeholder="••••••••"
          :error="errores.contrasena"
          @update:error="errores.contrasena = $event"
          @validacion="validacionCampo('contrasena', $event)"
          @blur="alPerderFoco('contrasena')"
          required
        >
          <template #icono>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </template>
        </CampoValidado>
      </div>
  
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
        <button
          type="button"
          @click="$emit('cambiar-vista', 'recuperacion')"
          class="text-sm font-medium text-[#EB0A1E] hover:text-[#d00919]"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
  
      <div v-if="errorGlobal" class="bg-red-50 text-[#EB0A1E] p-3 rounded-md text-sm">
        {{ errorGlobal }}
      </div>
  
      <div>
        <Boton type="submit" :cargando="cargando" anchoCompleto>
          Iniciar Sesión
        </Boton>
      </div>
  
      <div class="text-center">
        <p class="text-sm text-gray-600">
          ¿No tienes una cuenta?
          <button
            type="button"
            @click="$emit('cambiar-vista', 'registro')"
            class="font-medium text-[#EB0A1E] hover:text-[#d00919]"
          >
            Regístrate
          </button>
        </p>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import CampoValidado from '../ui/CampoValidado.vue';
  import Boton from '../ui/Boton.vue';
  import { validarEmail } from '../../utils/validaciones';
  import { useAuthStore } from '../../components/stores/auth';
  
  const emit = defineEmits(['cambiar-vista']);
  const router = useRouter();
  const authStore = useAuthStore();
  
  const formulario = ref({
    correo: '',
    contrasena: '',
    recordarme: false
  });
  
  const errores = ref({
    correo: '',
    contrasena: ''
  });
  
  const cargando = ref(false);
  const errorGlobal = ref('');
  
  // Función para validar campo cuando pierde foco
  const alPerderFoco = (campo) => {
    validarCampo(campo);
  };
  
  // Función para validar un campo específico
  const validarCampo = (campo) => {
    errores.value[campo] = '';
    
    if (campo === 'correo') {
      if (!formulario.value.correo) {
        errores.value.correo = 'El correo electrónico es requerido';
        return false;
      } 
      if (!validarEmail(formulario.value.correo)) {
        errores.value.correo = 'Por favor ingresa un correo electrónico válido';
        return false;
      }
    }
    
    if (campo === 'contrasena') {
      if (!formulario.value.contrasena) {
        errores.value.contrasena = 'La contraseña es requerida';
        return false;
      }
    }
    
    return true;
  };
  
  // Función para validar todo el formulario
  const validarFormulario = () => {
    let esValido = true;
    
    if (!validarCampo('correo')) {
      esValido = false;
    }
    
    if (!validarCampo('contrasena')) {
      esValido = false;
    }
    
    return esValido;
  };
  
  // Función para feedback de la validación
  const validacionCampo = (campo, esValido) => {
    console.log(`Campo ${campo} validado: ${esValido}`);
  };
  
  // Función principal para iniciar sesión
  const iniciarSesion = async () => {
    if (!validarFormulario()) return;
    
    try {
      cargando.value = true;
      errorGlobal.value = '';
      
      console.log("Iniciando sesión con:", {
        email: formulario.value.correo,
        password: formulario.value.contrasena,
        remember: formulario.value.recordarme
      });
      
      const resultado = await authStore.login({
        email: formulario.value.correo,
        password: formulario.value.contrasena,
        remember: formulario.value.recordarme
      });
      
      if (resultado) {
        // Redirigir según el rol
        router.push(authStore.isAdmin ? '/admin' : '/Home');
      } else {
        errorGlobal.value = 'Error al iniciar sesión. Verifica tus credenciales.';
      }
    } catch (err) {
      console.error('Error durante el inicio de sesión:', err);
      errorGlobal.value = err.message || 'Error al iniciar sesión. Verifica tus credenciales.';
    } finally {
      cargando.value = false;
    }
  };
  </script>