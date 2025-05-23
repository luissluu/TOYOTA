const express = require('express');
const router = express.Router();
const {
    getAllDetalles,
    getDetalleById,
    getDetallesByPedido,
    getDetallesByArticulo,
    getDetallesByEstado,
    createDetalle,
    updateDetalle,
    updateEstado,
    updateCantidadRecibida,
    deleteDetalle
} = require('../controllers/detallePedidoController');

// Obtener todos los detalles
router.get('/', getAllDetalles);

// Obtener un detalle por ID
router.get('/:id', getDetalleById);

// Obtener detalles por pedido
router.get('/pedido/:pedidoId', getDetallesByPedido);

// Obtener detalles por artículo
router.get('/articulo/:articuloId', getDetallesByArticulo);

// Obtener detalles por estado
router.get('/estado/:estado', getDetallesByEstado);

// Crear un nuevo detalle
router.post('/', createDetalle);

// Actualizar un detalle
router.put('/:id', updateDetalle);

// Actualizar estado de un detalle
router.patch('/:id/estado', updateEstado);

// Actualizar cantidad recibida
router.patch('/:id/cantidad', updateCantidadRecibida);

// Eliminar un detalle
router.delete('/:id', deleteDetalle);

module.exports = router; 