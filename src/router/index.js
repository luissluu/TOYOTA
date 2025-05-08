// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Registro from '../views/auth/Registro.vue'
import RecuperacionContrasena from '../views/auth/RecuperacionContrasena.vue'
import Configuracion from '../views/Configuracion.vue'
import Perfil from '../views/Perfil.vue'
import Servicios from '../views/Servicios.vue'
import Historial from '../views/Historial.vue'
import AdminHome from '../views/admin/AdminHome.vue'

// Guardias de navegación para proteger rutas
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  if (!token) {
    next('/login');
  } else {
    next();
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
  
  // Rutas principales (protegidas)
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/Servicios',
    name: 'Servicios',
    component: Servicios,
    meta: { requiresAuth: true }
  },
  {
    path: '/Historial',
    name: 'Historial',
    component: Historial,
    meta: { requiresAuth: true }
  },
  {
    path: '/configuracion',
    name: 'Configuracion',
    component: Configuracion,
    meta: { requiresAuth: true }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { requiresAuth: true }
  },

  //Rutas administrador
  {
    path: '/AdminHome',
    name: 'HomeAdmin',
    component:AdminHome,
    meta: {requireAuth:true}
  },
  
  // Ruta para manejar páginas no encontradas
  {
    path: '/:pathMatch(.*)*',
    redirect: '/Home'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guardia de navegación global
router.beforeEach((to, from, next) => {
  // Obtener token de autenticación
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  
  // Si la ruta requiere autenticación y no hay token, redirige a login
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } 
  // Si intenta acceder a rutas de autenticación y ya está autenticado, redirige a home
  else if ((to.path === '/login' || to.path === '/registro' || to.path === '/recuperar-contrasena') && token) {
    next('/Home');
  }
  // En otros casos, permite la navegación
  else {
    next();
  }
});

export default router