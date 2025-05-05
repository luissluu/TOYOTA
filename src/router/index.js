import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/auth/Login.vue'
import Registro from '../views/auth/Registro.vue'
import RecuperacionContrasena from '../views/auth/RecuperacionContrasena.vue'

const routes = [
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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/recuperar-contrasena',
    name: 'RecuperarContrasena',
    component: RecuperacionContrasena
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router