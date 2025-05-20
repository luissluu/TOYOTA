const express = require('express');
const router = express.Router();
const {
    getAllArticulos,
    getArticuloById,
    getArticuloByCodigo,
    getArticulosByCategoria,
    createArticulo,
    updateArticulo,
    deleteArticulo,
    updateStock
} = require('../controllers/inventarioController');

// Obtener todos los artículos
router.get('/', getAllArticulos);

// Obtener un artículo por ID
router.get('/:id', getArticuloById);

// Obtener un artículo por código
router.get('/codigo/:codigo', getArticuloByCodigo);

// Obtener artículos por categoría
router.get('/categoria/:categoria', getArticulosByCategoria);

// Crear un nuevo artículo
router.post('/', createArticulo);

// Actualizar un artículo
router.put('/:id', updateArticulo);

// Eliminar un artículo
router.delete('/:id', deleteArticulo);

// Actualizar stock de un artículo
router.patch('/:id/stock', updateStock);

module.exports = router; 