// src/stores/auth.js
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
    isLoading: (state) => state.loading,
    isAdmin: (state) => state.user?.role === 'admin',
    userRole: (state) => state.user?.role || 'user'
  },
  
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      
      try {
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
        } else {
          sessionStorage.setItem('auth_token', token);
          sessionStorage.setItem('user', JSON.stringify(user));
        }
        
        // Configurar el token para futuras peticiones
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return user;
        
        /* CÓDIGO PARA BACKEND REAL (descomentar cuando tengas el backend)
        // const response = await axios.post('/api/auth/login', {
        //   email: credentials.email,
        //   password: credentials.password
        // });
        // 
        // const { token, user } = response.data;
        // 
        // this.token = token;
        // this.user = user;
        // 
        // if (credentials.remember) {
        //   localStorage.setItem('auth_token', token);
        // } else {
        //   sessionStorage.setItem('auth_token', token);
        // }
        // 
        // // Configurar el token para futuras peticiones
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // 
        // return user;
        */
      } catch (error) {
        console.error('Error en login action:', error);
        this.error = 'Error al iniciar sesión. Por favor intenta nuevamente.';
        return null; // Devolvemos null en lugar de lanzar un error
        
        /* CÓDIGO PARA BACKEND REAL (descomentar cuando tengas el backend)
        // this.error = error.response?.data?.message || 'Error al iniciar sesión';
        // throw new Error(this.error);
        */
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
        console.error('Error en registro:', error);
        this.error = 'Error al registrarse. Por favor, intenta nuevamente.';
        return null;
        
        /* CÓDIGO PARA BACKEND REAL (descomentar cuando tengas el backend) 
        // this.error = error.response?.data?.message || 'Error al registrarse';
        // throw new Error(this.error);
        */
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
        
        /* CÓDIGO PARA BACKEND REAL (descomentar cuando tengas el backend)
        // const response = await axios.get('/api/auth/me');
        // this.user = response.data.user;
        // return this.user;
        */
      } catch (error) {
        // Si hay un error, probablemente el token es inválido
        console.error('Error al obtener usuario:', error);
        this.logout();
        return null;
        
        /* CÓDIGO PARA BACKEND REAL (descomentar cuando tengas el backend)
        // this.logout();
        // throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
        */
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
        
        /* CÓDIGO PARA BACKEND REAL (descomentar cuando tengas el backend)
        // await axios.post('/api/auth/forgot-password', { email });
        // return true;
        */
      } catch (error) {
        console.error('Error al solicitar recuperación de contraseña:', error);
        this.error = 'Error al procesar tu solicitud. Por favor, intenta nuevamente.';
        return false;
        
        /* CÓDIGO PARA BACKEND REAL (descomentar cuando tengas el backend)
        // this.error = error.response?.data?.message || 
        //            'Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.';
        // throw new Error(this.error);
        */
      } finally {
        this.loading = false;
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      
      delete axios.defaults.headers.common['Authorization'];
    }
  }
});