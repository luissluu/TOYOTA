// src/components/stores/auth.js (Corregido)
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null'),
    token: localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token') || null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    isLoading: (state) => state.loading,
    isAdmin: (state) => state.user?.role === 'admin',
    userRole: (state) => state.user?.role || 'user'
  },
  
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      
      try {
        console.log('Iniciando login con credenciales:', credentials);
        // Para desarrollo/pruebas - simular login exitoso
        
        // Verificar si es admin (para pruebas, puede usar un correo específico)
        const isAdmin = credentials.email.includes('admin@');
        
        // Simulación de respuesta exitosa
        const mockResponse = {
          data: {
            token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
            user: {
              id: '1',
              name: isAdmin ? 'Administrador' : 'Usuario de Prueba',
              email: credentials.email,
              role: isAdmin ? 'admin' : 'user'
            }
          }
        };
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Usar esta simulación en lugar de la llamada real a API
        const response = mockResponse;
        
        const { token, user } = response.data;
        
        this.token = token;
        this.user = user;
        
        if (credentials.remember) {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user', JSON.stringify(user));
          console.log('Guardando en localStorage:', { token, user });
        } else {
          sessionStorage.setItem('auth_token', token);
          sessionStorage.setItem('user', JSON.stringify(user));
          console.log('Guardando en sessionStorage:', { token, user });
        }
        
        // Configurar el token para futuras peticiones
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        console.log('Login exitoso:', user);
        return user;
        
      } catch (error) {
        console.error('Error en login action:', error);
        this.error = 'Error al iniciar sesión. Por favor intenta nuevamente.';
        return null; // Devolvemos null en lugar de lanzar un error
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
        
        const { token, user } = response.data;
        
        this.token = token;
        this.user = user;
        
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Configurar el token para futuras peticiones
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return user;
      } catch (error) {
        console.error('Error en registro:', error);
        this.error = 'Error al registrarse. Por favor, intenta nuevamente.';
        return null;
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
        if (!this.user) {
          // Intentar recuperar el usuario del almacenamiento
          const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
          if (userStr) {
            try {
              this.user = JSON.parse(userStr);
              return this.user;
            } catch (e) {
              console.error('Error al parsear usuario almacenado:', e);
            }
          }
        }
        
        // Si no tenemos usuario almacenado, simulamos obtenerlo
        if (!this.user) {
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
        }
        
        return this.user;
      } catch (error) {
        // Si hay un error, probablemente el token es inválido
        console.error('Error al obtener usuario:', error);
        this.logout();
        return null;
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
        console.error('Error al solicitar recuperación de contraseña:', error);
        this.error = 'Error al procesar tu solicitud. Por favor, intenta nuevamente.';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user');
      
      delete axios.defaults.headers.common['Authorization'];
    }
  }
});