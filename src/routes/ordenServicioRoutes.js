const express = require('express');
const router = express.Router();
const {
    getAllOrdenes,
    getOrdenById,
    getOrdenesByUsuario,
    getOrdenesByVehiculo,
    getOrdenesByEstado,
    createOrden,
    updateOrden,
    updateEstado,
    updateTotal,
    deleteOrden,
    finalizarOrden,
    exportarPDFOrden
} = require('../controllers/ordenServicioController');

// Obtener todas las órdenes
router.get('/', getAllOrdenes);

// Obtener PDF de una orden por ID
router.get('/:id/pdf', exportarPDFOrden);

// Obtener una orden por ID
router.get('/:id', getOrdenById);

// Obtener órdenes por usuario
router.get('/usuario/:usuarioId', getOrdenesByUsuario);

// Obtener órdenes por vehículo
router.get('/vehiculo/:vehiculoId', getOrdenesByVehiculo);

// Obtener órdenes por estado
router.get('/estado/:estado', getOrdenesByEstado);

// Crear una nueva orden
router.post('/', createOrden);

// Actualizar una orden
router.put('/:id', updateOrden);

// Actualizar estado de una orden
router.patch('/:id/estado', updateEstado);

// Actualizar total de una orden
router.patch('/:id/total', updateTotal);

// Eliminar una orden
router.delete('/:id', deleteOrden);


// Finalizar una orden
router.put('/:id/finalizar', finalizarOrden);



module.exports = router; 