<template>
  <div v-if="enviado" class="text-center space-y-6">
    <div class="p-6 bg-green-50 rounded-md">
      <h3 class="text-lg font-medium text-green-800 mb-2">Solicitud Enviada</h3>
      <p class="text-sm text-green-700">
        Si existe una cuenta con el correo <strong>{{ formulario.correo }}</strong>, recibirás instrucciones para restablecer tu contraseña.
      </p>
    </div>
    <Boton
      type="button"
      variante="contorno"
      @click="$emit('cambiar-vista', 'login')"
    >
      Volver a Iniciar Sesión
    </Boton>
  </div>
  
  <form v-else @submit.prevent="recuperarContrasena" class="space-y-6">
    <div>
      <h3 class="text-lg font-medium mb-2">¿Olvidaste tu contraseña?</h3>
      <p class="text-sm text-gray-600 mb-4">
        Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </p>
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

    <div v-if="error" class="bg-red-50 text-[#EB0A1E] p-3 rounded-md text-sm">
      {{ error }}
    </div>

    <div>
      <Boton type="submit" :cargando="cargando" anchoCompleto>
        Enviar Instrucciones
      </Boton>
    </div>

    <div class="text-center">
      <button
        type="button"
        @click="$emit('cambiar-vista', 'login')"
        class="text-sm font-medium text-[#EB0A1E] hover:text-[#d00919]"
      >
        Volver a Iniciar Sesión
      </button>
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
  correo: ''
});

const errores = reactive({
  correo: ''
});

const cargando = ref(false);
const error = ref('');
const enviado = ref(false);

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
  
  return esValido;
};

const recuperarContrasena = async () => {
  if (!validarFormulario()) return;
  
  try {
    cargando.value = true;
    error.value = '';
    
    await authStore.forgotPassword(formulario.correo);
    enviado.value = true;
  } catch (err) {
    error.value = err.message || 'Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.';
  } finally {
    cargando.value = false;
  }
};
</script>

// ===== auth.js =====
// Ubicación: /src/stores/auth.js

import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('auth_token'),
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    isLoading: (state) => state.loading
  },
  
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.post('/api/auth/login', {
          email: credentials.email,
          password: credentials.password
        });
        
        const { token, user } = response.data;
        
        this.token = token;
        this.user = user;
        
        if (credentials.remember) {
          localStorage.setItem('auth_token', token);
        } else {
          sessionStorage.setItem('auth_token', token);
        }
        
        // Configurar el token para futuras peticiones
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return user;
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al iniciar sesión';
        throw new Error(this.error);
      } finally {
        this.loading = false;
      }
    },
    
    async register(userData) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.post('/api/auth/register', userData);
        
        const { token, user } = response.data;
        
        this.token = token;
        this.user = user;
        
        localStorage.setItem('auth_token', token);
        
        // Configurar el token para futuras peticiones
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return user;
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al registrarse';
        throw new Error(this.error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchUser() {
      // Solo hacer la petición si hay un token
      if (!this.token) return null;
      
      this.loading = true;
      
      try {
        const response = await axios.get('/api/auth/me');
        this.user = response.data.user;
        return this.user;
      } catch (error) {
        // Si hay un error, probablemente el token es inválido
        this.logout();
        throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
      } finally {
        this.loading = false;
      }
    },
    
    async forgotPassword(email) {
      this.loading = true;
      this.error = null;
      
      try {
        await axios.post('/api/auth/forgot-password', { email });
        return true;
      } catch (error) {
        this.error = error.response?.data?.message || 
                    'Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.';
        throw new Error(this.error);
      } finally {
        this.loading = false;
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
      
      // Eliminar el token de las cabeceras
      delete axios.defaults.headers.common['Authorization'];
    }
  }
});