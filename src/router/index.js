import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Registro from '../views/auth/Registro.vue'
import RecuperacionContrasena from '../views/auth/RecuperacionContrasena.vue'
import Configuracion from '../views/Configuracion.vue'
import Perfil from '../views/Perfil.vue'
import Servicios from '../views/Servicios.vue'
import Historial from '../views/Historial.vue'

// Layouts
import AdminLayout from '../Layouts/AdminLayout.vue'

// Admin views
import AdminHome from '../views/admin/AdminHome.vue'
import AdminPerfil from '../views/admin/AdminPerfil.vue'
import AdminCambiarContrasena from '../views/admin/AdminCambiarContrasena.vue'
// Importa aquí las demás vistas de administrador a medida que las crees

// Importamos la tienda de autenticación
import { useAuthStore } from '../components/stores/auth'

// Ruta protegida que verifica el rol de usuario
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  if (!token) {
    return next('/login');
  }
  next();
};

// Ruta protegida que verifica que el usuario sea administrador
const requireAdmin = (to, from, next) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  
  if (!token) {
    return next('/login');
  }
  if (!authStore.user) {
    try {
      // Cargar los datos del usuario desde localStorage/sessionStorage
      const userData = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
      
      // Comprobar el rol
      if (userData && userData.role === 'admin') {
        authStore.user = userData;
        next();
      } else {
        // Si no es admin, redirigir a la página principal
        next('/Home');
      }
    } catch (error) {
      console.error('Error al verificar el rol del usuario:', error);
      next('/login');
    }
  } else if (authStore.isAdmin) {
    // Si ya tenemos la info del usuario y es admin, permitir acceso
    next();
  } else {
    // Si no es admin, redirigir a la página principal
    next('/Home');
  }
};

const routes = [
  {
    path: '/',
    redirect: '/login'  // Esto hará que la ruta raíz redirija a login
  },
  
  // Rutas de autenticación
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'auth' }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro,
    meta: { layout: 'auth' }
  },
  {
    path: '/recuperar-contrasena',
    name: 'RecuperarContrasena',
    component: RecuperacionContrasena,
    meta: { layout: 'auth' }
  },
  
  // Rutas principales para usuarios normales (protegidas)
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
  {
    path: '/Servicios',
    name: 'Servicios',
    component: Servicios,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
  {
    path: '/Historial',
    name: 'Historial',
    component: Historial,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
  {
    path: '/configuracion',
    name: 'Configuracion',
    component: Configuracion,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },

  // Rutas de administrador (protegidas por rol)
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: AdminHome
      },
      {
        path: 'perfil',
        name: 'AdminPerfil',
        component: AdminPerfil
      },
      {
        path: 'cambiar-contrasena',
        name: 'AdminCambiarContrasena',
        component: AdminCambiarContrasena
      },
      {
        path: 'usuarios',
        name: 'AdminUsuarios',
        component: () => import('../views/admin/AdminUsuarios.vue')
      },
      {
        path: 'servicios',
        name: 'AdminHistorialServ',
        component: () => import('../views/admin/AdminHistorialServ.vue')
      },
      {
        path: 'reportes',
        name: 'AdminInventario',
        component: () => import('../views/admin/AdminInventario.vue')
      },
      {
        path: 'configuracion',
        name: 'AdminConfiguracion',
        component: () => import('../views/admin/AdminConfiguracion.vue')
      }
    ]
  },
  
  // Ruta para manejar páginas no encontradas
  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => {
      const authStore = useAuthStore();
      return authStore.isAdmin ? '/admin' : '/Home';
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guardia de navegación global
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  
  // Si la ruta requiere autenticación y no hay token, redirige a login
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    return next('/login');
  }
  
  // Si intenta acceder a rutas de autenticación y ya está autenticado, redirige según rol
  if ((to.path === '/login' || to.path === '/registro' || to.path === '/recuperar-contrasena') && token) {
    // Intentar obtener la información del usuario si no la tenemos
    if (!authStore.user) {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
        authStore.user = userData;
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }
    }
    
    // Redirigir según el rol
    return next(authStore.isAdmin ? '/admin' : '/Home');
  }
  
  // En otros casos, permite la navegación
  next();
});

export default router;