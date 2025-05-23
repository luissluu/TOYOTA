const express = require('express');
const router = express.Router();
const {
    getAllMovimientos,
    getMovimientoById,
    getMovimientosByArticulo,
    getMovimientosByTipo,
    getMovimientosByOrden,
    getMovimientosByProveedor,
    getMovimientosByUsuario,
    getMovimientosByFecha,
    createMovimiento,
    updateMovimiento,
    deleteMovimiento
} = require('../controllers/movimientoInventarioController');

// Obtener todos los movimientos
router.get('/', getAllMovimientos);

// Obtener un movimiento por ID
router.get('/:id', getMovimientoById);

// Obtener movimientos por artículo
router.get('/articulo/:articuloId', getMovimientosByArticulo);

// Obtener movimientos por tipo
router.get('/tipo/:tipo', getMovimientosByTipo);

// Obtener movimientos por orden
router.get('/orden/:ordenId', getMovimientosByOrden);

// Obtener movimientos por proveedor
router.get('/proveedor/:proveedorId', getMovimientosByProveedor);

// Obtener movimientos por usuario
router.get('/usuario/:usuarioId', getMovimientosByUsuario);

// Obtener movimientos por rango de fechas
router.get('/fecha', getMovimientosByFecha);

// Crear un nuevo movimiento
router.post('/', createMovimiento);

// Actualizar un movimiento
router.put('/:id', updateMovimiento);

// Eliminar un movimiento
router.delete('/:id', deleteMovimiento);

module.exports = router; 