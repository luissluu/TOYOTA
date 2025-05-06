// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import "./assets/app.css";

// Crear la aplicación
const app = createApp(App);

// Registrar Pinia para la gestión de estados
app.use(createPinia());

// Registrar el enrutador
app.use(router);

// Montar la aplicación
app.mount('#app');