const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const rolRoutes = require('./routes/rolRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const serviciosRoutes = require('./routes/serviciosRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const citasRoutes = require('./routes/citasRoutes');
const ordenServicioRoutes = require('./routes/ordenServicioRoutes');
const detalleOrdenRoutes = require('./routes/detalleOrdenRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const detallePedidoRoutes = require('./routes/detallePedidoRoutes');
const movimientoInventarioRoutes = require('./routes/movimientoInventarioRoutes');
const inventarioHerramientaRoutes = require('./routes/inventarioHerramientaRoutes');
const estadisticasRoutes = require('./routes/estadisticasRoutes');

// Cargar variables de entorno
dotenv.config();

// Inicializar express
const app = express();

// Configurar middlewares
app.use(cors({
  origin: ['https://toyota-one.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
app.use(helmet());
app.use(express.json());

// Configurar rutas
app.use('/api/auth', authRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/ordenes-servicio', ordenServicioRoutes);
app.use('/api/detalles-orden', detalleOrdenRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/detalles-pedido', detallePedidoRoutes);
app.use('/api/movimientos-inventario', movimientoInventarioRoutes);
app.use('/api/inventario-herramientas', inventarioHerramientaRoutes);
app.use('/api/estadisticas', estadisticasRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API del Sistema de Gestión de Taller Mecánico funcionando correctamente');
});

// Manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;