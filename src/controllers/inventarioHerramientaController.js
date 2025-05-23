const InventarioHerramienta = require('../entities/InventarioHerramienta');

const getAllHerramientas = async (req, res) => {
    try {
        const herramientas = await InventarioHerramienta.findAll();
        res.json(herramientas);
    } catch (error) {
        console.error('Error al obtener herramientas:', error);
        res.status(500).json({ error: 'Error al obtener las herramientas' });
    }
};

const getHerramientaById = async (req, res) => {
    try {
        const { id } = req.params;
        const herramienta = await InventarioHerramienta.findById(id);
        if (!herramienta) {
            return res.status(404).json({ error: 'Herramienta no encontrada' });
        }
        res.json(herramienta);
    } catch (error) {
        console.error('Error al obtener herramienta:', error);
        res.status(500).json({ error: 'Error al obtener la herramienta' });
    }
};

const createHerramienta = async (req, res) => {
    try {
        const herramienta = await InventarioHerramienta.create(req.body);
        res.status(201).json(herramienta);
    } catch (error) {
        console.error('Error al crear herramienta:', error);
        res.status(500).json({ error: 'Error al crear la herramienta' });
    }
};

const updateHerramienta = async (req, res) => {
    try {
        const { id } = req.params;
        const herramienta = await InventarioHerramienta.update(id, req.body);
        if (!herramienta) {
            return res.status(404).json({ error: 'Herramienta no encontrada' });
        }
        res.json(herramienta);
    } catch (error) {
        console.error('Error al actualizar herramienta:', error);
        res.status(500).json({ error: 'Error al actualizar la herramienta' });
    }
};

const deleteHerramienta = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await InventarioHerramienta.delete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Herramienta no encontrada' });
        }
        res.json({ message: 'Herramienta eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar herramienta:', error);
        res.status(500).json({ error: 'Error al eliminar la herramienta' });
    }
};

module.exports = {
    getAllHerramientas,
    getHerramientaById,
    createHerramienta,
    updateHerramienta,
    deleteHerramienta
}; 