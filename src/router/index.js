import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/auth/Login.vue'
import Registro from '../views/auth/Registro.vue'
import RecuperacionContrasena from '../views/auth/RecuperacionContrasena.vue'


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
    path: '/',
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
    component: () => import('../views/Configuracion.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/Perfil.vue')
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

export default router