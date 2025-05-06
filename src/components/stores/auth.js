

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
        // Para desarrollo/pruebas - simular login exitoso
        // En producción, descomenta el código de axios y conecta con tu backend real
        
        // Simulación de respuesta exitosa
        const mockResponse = {
          data: {
            token: 'mock-jwt-token',
            user: {
              id: '1',
              name: 'Usuario de Prueba',
              email: credentials.email,
              role: 'user'
            }
          }
        };
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Usar esta simulación en lugar de la llamada real a API
        const response = mockResponse;
        
        /* Código para producción - conéctate a tu API real
        const response = await axios.post('/api/auth/login', {
          email: credentials.email,
          password: credentials.password
        });
        */
        
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
        // Para desarrollo/pruebas - simular registro exitoso
        
        // Simulación de respuesta exitosa
        const mockResponse = {
          data: {
            token: 'mock-jwt-token',
            user: {
              id: '1',
              name: userData.name,
              email: userData.email,
              role: 'user'
            }
          }
        };
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Usar esta simulación en lugar de la llamada real a API
        const response = mockResponse;
        
        /* Código para producción - conéctate a tu API real
        const response = await axios.post('/api/auth/register', userData);
        */
        
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
        // Para desarrollo/pruebas - simular obtención de usuario
        
        // Simulación de respuesta exitosa
        const mockResponse = {
          data: {
            user: {
              id: '1',
              name: 'Usuario de Prueba',
              email: 'usuario@ejemplo.com',
              role: 'user'
            }
          }
        };
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const response = mockResponse;
        
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
        // Para desarrollo/pruebas - simular recuperación de contraseña
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 800));
        
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
      
      delete axios.defaults.headers.common['Authorization'];
    }
  }
});