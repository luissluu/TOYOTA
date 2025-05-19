const express = require('express');
const router = express.Router();
const {
    getAllPedidos,
    getPedidoById,
    getPedidosByProveedor,
    getPedidosByUsuario,
    createPedido,
    updatePedido,
    updateTotal,
    deletePedido
} = require('../controllers/pedidoController');

// Obtener todos los pedidos
router.get('/', getAllPedidos);

// Obtener un pedido por ID
router.get('/:id', getPedidoById);

// Obtener pedidos por proveedor
router.get('/proveedor/:proveedorId', getPedidosByProveedor);

// Obtener pedidos por usuario
router.get('/usuario/:usuarioId', getPedidosByUsuario);

// Crear un nuevo pedido
router.post('/', createPedido);

// Actualizar un pedido
router.put('/:id', updatePedido);

// Actualizar el total de un pedido
router.patch('/:id/total', updateTotal);

// Eliminar un pedido
router.delete('/:id', deletePedido);

module.exports = router; 