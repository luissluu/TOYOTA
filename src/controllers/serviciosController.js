const Servicio = require('../entities/servicio');

// Obtener todos los servicios
const getAllServicios = async (req, res) => {
    try {
        const servicios = await Servicio.findAll();
        res.json(servicios);
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
};

// Obtener un servicio por ID
const getServicioById = async (req, res) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.findById(id);
        
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        
        res.json(servicio);
    } catch (error) {
        console.error('Error al obtener servicio:', error);
        res.status(500).json({ error: 'Error al obtener el servicio' });
    }
};

// Crear un nuevo servicio
const createServicio = async (req, res) => {
    try {
        const servicio = await Servicio.create(req.body);
        res.status(201).json(servicio);
    } catch (error) {
        console.error('Error al crear servicio:', error);
        res.status(500).json({ error: 'Error al crear el servicio' });
    }
};

// Actualizar un servicio
const updateServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.update(id, req.body);
        
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        
        res.json(servicio);
    } catch (error) {
        console.error('Error al actualizar servicio:', error);
        res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
};

// Eliminar un servicio
const deleteServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Servicio.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        
        res.json({ message: 'Servicio eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar servicio:', error);
        res.status(500).json({ error: 'Error al eliminar el servicio' });
    }
};

module.exports = {
    getAllServicios,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio
}; 