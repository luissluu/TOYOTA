<template>
  <div class="w-full max-w-md mx-auto">
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center p-2 bg-[#EB0A1E] rounded-full mb-4">
        <img src="/src/assets/logo.svg" alt="Toyota Logo" class="w-7 h-7 text-white" />
      </div>
      <h2 class="text-2xl font-bold text-gray-900">Toyota</h2>
      <p class="text-sm text-gray-600 mt-1">
        Soluciones de movilidad para todos
      </p>
    </div>
    
    <div class="bg-white p-8 shadow-lg rounded-lg border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">
        <template v-if="vistaActual === 'login'">Iniciar Sesión</template>
        <template v-else-if="vistaActual === 'registro'">Crear Cuenta</template>
        <template v-else-if="vistaActual === 'recuperacion'">Recuperar Contraseña</template>
      </h3>
      
      <component 
        :is="componente" 
        @cambiar-vista="cambiarVista" 
      />
    </div>
    
    <div class="text-center mt-6 text-xs text-gray-500">
      &copy; {{ new Date().getFullYear() }} Toyota. Todos los derechos reservados.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import FormularioLogin from './FormularioLogin.vue';
import FormularioRegistro from './FormularioRegistro.vue';
import FormularioRecuperacion from './FormularioRecuperacion.vue';

const props = defineProps({
  vista: {
    type: String,
    default: 'login',
    validator: (value) => ['login', 'registro', 'recuperacion'].includes(value)
  }
});

const vistaActual = ref(props.vista);

const componente = computed(() => {
  switch (vistaActual.value) {
    case 'registro':
      return FormularioRegistro;
    case 'recuperacion':
      return FormularioRecuperacion;
    default:
      return FormularioLogin;
  }
});

const cambiarVista = (vista) => {
  vistaActual.value = vista;
};

onMounted(() => {
  // Inicializar la vista según props
  vistaActual.value = props.vista;
});
</script>

// ===== FormularioLogin.vue =====
// Ubicación: /src/components/auth/FormularioLogin.vue

<template>
  <form @submit.prevent="iniciarSesion" class="space-y-6">
    <div>
      <CampoTexto
        id="correo"
        v-model="formulario.correo"
        type="email"
        autocomplete="email"
        label="Correo Electrónico"
        placeholder="correo@ejemplo.com"
        :error="errores.correo"
        required
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </template>
      </CampoTexto>
    </div>

    <div>
      <CampoTexto
        id="contrasena"
        v-model="formulario.contrasena"
        type="password"
        autocomplete="current-password"
        label="Contraseña"
        placeholder="••••••••"
        :error="errores.contrasena"
        required
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
        </template>
      </CampoTexto>
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

    <div v-if="error" class="bg-red-50 text-[#EB0A1E] p-3 rounded-md text-sm">
      {{ error }}
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
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import CampoTexto from '../ui/CampoTexto.vue';
import Boton from '../ui/Boton.vue';

const emit = defineEmits(['cambiar-vista']);
const authStore = useAuthStore();

const formulario = reactive({
  correo: '',
  contrasena: '',
  recordarme: false
});

const errores = reactive({
  correo: '',
  contrasena: ''
});

const cargando = ref(false);
const error = ref('');

const validarFormulario = () => {
  let esValido = true;
  
  // Validar correo
  if (!formulario.correo) {
    errores.correo = 'El correo electrónico es requerido';
    esValido = false;
  } else if (!/\S+@\S+\.\S+/.test(formulario.correo)) {
    errores.correo = 'Por favor, ingresa un correo electrónico válido';
    esValido = false;
  } else {
    errores.correo = '';
  }
  
  // Validar contraseña
  if (!formulario.contrasena) {
    errores.contrasena = 'La contraseña es requerida';
    esValido = false;
  } else if (formulario.contrasena.length < 6) {
    errores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    esValido = false;
  } else {
    errores.contrasena = '';
  }
  
  return esValido;
};

const iniciarSesion = async () => {
  if (!validarFormulario()) return;
  
  try {
    cargando.value = true;
    error.value = '';
    
    await authStore.login({
      email: formulario.correo,
      password: formulario.contrasena,
      remember: formulario.recordarme
    });
    
    // Redirigir al usuario después del login exitoso
    // router.push('/dashboard');
  } catch (err) {
    error.value = err.message || 'Error al iniciar sesión. Verifica tus credenciales.';
  } finally {
    cargando.value = false;
  }
};
</script>

// ===== FormularioRegistro.vue =====
// Ubicación: /src/components/auth/FormularioRegistro.vue

<template>
  <form @submit.prevent="registrarse" class="space-y-6">
    <div>
      <CampoTexto
        id="nombre"
        v-model="formulario.nombre"
        type="text"
        autocomplete="name"
        label="Nombre Completo"
        placeholder="Tu nombre"
        :error="errores.nombre"
        required
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </template>
      </CampoTexto>
    </div>

    <div>
      <CampoTexto
        id="correo"
        v-model="formulario.correo"
        type="email"
        autocomplete="email"
        label="Correo Electrónico"
        placeholder="correo@ejemplo.com"
        :error="errores.correo"
        required
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </template>
      </CampoTexto>
    </div>

    <div>
      <CampoTexto
        id="contrasena"
        v-model="formulario.contrasena"
        type="password"
        autocomplete="new-password"
        label="Contraseña"
        placeholder="••••••••"
        :error="errores.contrasena"
        required
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
        </template>
      </CampoTexto>
    </div>

    <div>
      <CampoTexto
        id="confirmarContrasena"
        v-model="formulario.confirmarContrasena"
        type="password"
        autocomplete="new-password"
        label="Confirmar Contraseña"
        placeholder="••••••••"
        :error="errores.confirmarContrasena"
        required
      >
        <template #icono>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
        </template>
      </CampoTexto>
    </div>

    <div v-if="error" class="bg-red-50 text-[#EB0A1E] p-3 rounded-md text-sm">
      {{ error }}
    </div>

    <div>
      <Boton type="submit" :cargando="cargando" anchoCompleto>
        Registrarse
      </Boton>
    </div>

    <div class="text-center">
      <p class="text-sm text-gray-600">
        ¿Ya tienes una cuenta?
        <button
          type="button"
          @click="$emit('cambiar-vista', 'login')"
          class="font-medium text-[#EB0A1E] hover:text-[#d00919]"
        >
          Inicia Sesión
        </button>
      </p>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import CampoTexto from '../ui/CampoTexto.vue';
import Boton from '../ui/Boton.vue';

const emit = defineEmits(['cambiar-vista']);
const authStore = useAuthStore();

const formulario = reactive({
  nombre: '',
  correo: '',
  contrasena: '',
  confirmarContrasena: ''
});

const errores = reactive({
  nombre: '',
  correo: '',
  contrasena: '',
  confirmarContrasena: ''
});

const cargando = ref(false);
const error = ref('');

const validarFormulario = () => {
  let esValido = true;
  
  // Validar nombre
  if (!formulario.nombre) {
    errores.nombre = 'El nombre es requerido';
    esValido = false;
  } else {
    errores.nombre = '';
  }
  
  // Validar correo
  if (!formulario.correo) {
    errores.correo = 'El correo electrónico es requerido';
    esValido = false;
  } else if (!/\S+@\S+\.\S+/.test(formulario.correo)) {
    errores.correo = 'Por favor, ingresa un correo electrónico válido';
    esValido = false;
  } else {
    errores.correo = '';
  }
  
  // Validar contraseña
  if (!formulario.contrasena) {
    errores.contrasena = 'La contraseña es requerida';
    esValido = false;
  } else if (formulario.contrasena.length < 6) {
    errores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    esValido = false;
  } else {
    errores.contrasena = '';
  }
  
  // Validar confirmación de contraseña
  if (!formulario.confirmarContrasena) {
    errores.confirmarContrasena = 'Por favor, confirma tu contraseña';
    esValido = false;
  } else if (formulario.contrasena !== formulario.confirmarContrasena) {
    errores.confirmarContrasena = 'Las contraseñas no coinciden';
    esValido = false;
  } else {
    errores.confirmarContrasena = '';
  }
  
  return esValido;
};

const registrarse = async () => {
  if (!validarFormulario()) return;
  
  try {
    cargando.value = true;
    error.value = '';
    
    await authStore.register({
      name: formulario.nombre,
      email: formulario.correo,
      password: formulario.contrasena
    });
    
    // Redirigir al usuario después del registro exitoso
    // router.push('/dashboard');
  } catch (err) {
    error.value = err.message || 'Error al registrarse. Por favor, intenta con otro correo electrónico.';
  } finally {
    cargando.value = false;
  }
};
</script>