const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const rolRoutes = require('./routes/rolRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');

// Cargar variables de entorno
dotenv.config();

// Inicializar express
const app = express();

// Configurar middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Configurar rutas
app.use('/api/auth', authRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/vehiculos', vehiculoRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API del Sistema de Gestión de Taller Mecánico funcionando correctamente');
});

// Manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;