const Inventario = require('../entities/Inventario');

// Obtener todos los artículos
const getAllArticulos = async (req, res) => {
    try {
        const articulos = await Inventario.findAll();
        res.json(articulos);
    } catch (error) {
        console.error('Error al obtener artículos:', error);
        res.status(500).json({ error: 'Error al obtener los artículos' });
    }
};

// Obtener un artículo por ID
const getArticuloById = async (req, res) => {
    try {
        const { id } = req.params;
        const articulo = await Inventario.findById(id);
        
        if (!articulo) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }
        
        res.json(articulo);
    } catch (error) {
        console.error('Error al obtener artículo:', error);
        res.status(500).json({ error: 'Error al obtener el artículo' });
    }
};

// Obtener un artículo por código
const getArticuloByCodigo = async (req, res) => {
    try {
        const { codigo } = req.params;
        const articulo = await Inventario.findByCodigo(codigo);
        
        if (!articulo) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }
        
        res.json(articulo);
    } catch (error) {
        console.error('Error al obtener artículo:', error);
        res.status(500).json({ error: 'Error al obtener el artículo' });
    }
};

// Obtener artículos por categoría
const getArticulosByCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        const articulos = await Inventario.findByCategoria(categoria);
        res.json(articulos);
    } catch (error) {
        console.error('Error al obtener artículos por categoría:', error);
        res.status(500).json({ error: 'Error al obtener los artículos por categoría' });
    }
};

// Crear un nuevo artículo
const createArticulo = async (req, res) => {
    try {
        const articulo = await Inventario.create(req.body);
        res.status(201).json(articulo);
    } catch (error) {
        console.error('Error al crear artículo:', error);
        if (error.message === 'El código del artículo ya existe') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al crear el artículo' });
    }
};

// Actualizar un artículo
const updateArticulo = async (req, res) => {
    try {
        const { id } = req.params;
        const articulo = await Inventario.update(id, req.body);
        
        if (!articulo) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }
        
        res.json(articulo);
    } catch (error) {
        console.error('Error al actualizar artículo:', error);
        if (error.message === 'El código del artículo ya existe') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al actualizar el artículo' });
    }
};

// Eliminar un artículo
const deleteArticulo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Inventario.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }
        
        res.json({ message: 'Artículo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar artículo:', error);
        res.status(500).json({ error: 'Error al eliminar el artículo' });
    }
};

// Actualizar stock de un artículo
const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        
        if (typeof cantidad !== 'number') {
            return res.status(400).json({ error: 'La cantidad debe ser un número' });
        }
        
        const articulo = await Inventario.updateStock(id, cantidad);
        
        if (!articulo) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }
        
        res.json(articulo);
    } catch (error) {
        console.error('Error al actualizar stock:', error);
        res.status(500).json({ error: 'Error al actualizar el stock' });
    }
};

module.exports = {
    getAllArticulos,
    getArticuloById,
    getArticuloByCodigo,
    getArticulosByCategoria,
    createArticulo,
    updateArticulo,
    deleteArticulo,
    updateStock
}; 