import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Registro from '../views/auth/Registro.vue'
import RecuperacionContrasena from '../views/auth/RecuperacionContrasena.vue'
import Configuracion from '../views/Configuracion.vue'
import Perfil from '../views/Perfil.vue'
import Servicios from '../views/Servicios.vue'
import Historial from '../views/Historial.vue'


const routes = [

  {
    path: '/',
    redirect: '/login'  // Esto hará que la ruta raíz redirija a login
  },
  
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'auth' }
  },
  
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Servicios',
    name: 'Servicios',
    component: () => import('../views/Servicios.vue')
  },
  {
    path: '/Historial',
    name: 'Historial',
    component: () => import('../views/Historial.vue')
  },
  {
    path: '/configuracion',
    name: 'Configuracion',
    component: Configuracion
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil
  },
  // Rutas de autenticación

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guardia de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  // Obtener token de autenticación
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  
  // Si la ruta requiere autenticación y no hay token, redirige a login
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } 
  // Si intenta acceder a rutas de autenticación y ya está autenticado, redirige a home
  else if ((to.path === '/login' || to.path === '/registro' || to.path === '/recuperar-contrasena') && token) {
    next('/');
  }
  // En otros casos, permite la navegación
  else {
    next();
  }
});

export default router