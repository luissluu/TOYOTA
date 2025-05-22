const express = require('express');
const router = express.Router();
const {
    getAllDetalles,
    getDetalleById,
    getDetallesByOrden,
    getDetallesByMecanico,
    getDetallesByEstado,
    createDetalle,
    updateDetalle,
    updateEstado,
    updateMecanico,
    deleteDetalle,
    updateEstadoDetalle
} = require('../controllers/detalleOrdenController');

// Obtener todos los detalles
router.get('/', getAllDetalles);

// Obtener un detalle por ID
router.get('/:id', getDetalleById);

// Obtener detalles por orden
router.get('/orden/:ordenId', getDetallesByOrden);

// Obtener detalles por mecánico
router.get('/mecanico/:mecanicoId', getDetallesByMecanico);

// Obtener detalles por estado
router.get('/estado/:estado', getDetallesByEstado);

// Crear un nuevo detalle
router.post('/', createDetalle);

// Actualizar un detalle
router.put('/:id', updateDetalle);

// Actualizar estado de un detalle
router.patch('/:id/estado', updateEstado);

// Actualizar mecánico de un detalle
router.patch('/:id/mecanico', updateMecanico);

// Actualizar estado de un detalle
router.put('/:id/estado', updateEstadoDetalle);

// Eliminar un detalle
router.delete('/:id', deleteDetalle);

module.exports = router; 