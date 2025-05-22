const DetalleOrden = require('../entities/DetalleOrden');
const OrdenServicio = require('../entities/OrdenServicio');

// Obtener todos los detalles
const getAllDetalles = async (req, res) => {
    try {
        const detalles = await DetalleOrden.findAll();
        res.json(detalles);
    } catch (error) {
        console.error('Error al obtener detalles:', error);
        res.status(500).json({ error: 'Error al obtener los detalles de orden' });
    }
};

// Obtener un detalle por ID
const getDetalleById = async (req, res) => {
    try {
        const { id } = req.params;
        const detalle = await DetalleOrden.findById(id);
        
        if (!detalle) {
            return res.status(404).json({ error: 'Detalle de orden no encontrado' });
        }
        
        res.json(detalle);
    } catch (error) {
        console.error('Error al obtener detalle:', error);
        res.status(500).json({ error: 'Error al obtener el detalle de orden' });
    }
};

// Obtener detalles por orden
const getDetallesByOrden = async (req, res) => {
    try {
        const { ordenId } = req.params;
        const detalles = await DetalleOrden.findByOrden(ordenId);
        res.json(detalles);
    } catch (error) {
        console.error('Error al obtener detalles de la orden:', error);
        res.status(500).json({ error: 'Error al obtener los detalles de la orden' });
    }
};

// Obtener detalles por mecánico
const getDetallesByMecanico = async (req, res) => {
    try {
        const { mecanicoId } = req.params;
        const detalles = await DetalleOrden.findByMecanico(mecanicoId);
        res.json(detalles);
    } catch (error) {
        console.error('Error al obtener detalles del mecánico:', error);
        res.status(500).json({ error: 'Error al obtener los detalles del mecánico' });
    }
};

// Obtener detalles por estado
const getDetallesByEstado = async (req, res) => {
    try {
        const { estado } = req.params;
        const detalles = await DetalleOrden.findByEstado(estado);
        res.json(detalles);
    } catch (error) {
        console.error('Error al obtener detalles por estado:', error);
        res.status(500).json({ error: 'Error al obtener los detalles por estado' });
    }
};

// Crear un nuevo detalle
const createDetalle = async (req, res) => {
    try {
        const detalle = await DetalleOrden.create(req.body);
        res.status(201).json(detalle);
    } catch (error) {
        console.error('Error al crear detalle:', error);
        if (error.message === 'La orden, servicio o mecánico especificado no existe') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al crear el detalle de orden' });
    }
};

// Actualizar un detalle
const updateDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const detalle = await DetalleOrden.update(id, req.body);
        
        if (!detalle) {
            return res.status(404).json({ error: 'Detalle de orden no encontrado' });
        }
        
        res.json(detalle);
    } catch (error) {
        console.error('Error al actualizar detalle:', error);
        res.status(500).json({ error: 'Error al actualizar el detalle de orden' });
    }
};

// Actualizar estado de un detalle
const updateEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        
        if (!estado) {
            return res.status(400).json({ error: 'El estado es requerido' });
        }
        
        const detalle = await DetalleOrden.updateEstado(id, estado);
        
        if (!detalle) {
            return res.status(404).json({ error: 'Detalle de orden no encontrado' });
        }
        
        res.json(detalle);
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        res.status(500).json({ error: 'Error al actualizar el estado del detalle' });
    }
};

// Actualizar mecánico de un detalle
const updateMecanico = async (req, res) => {
    try {
        const { id } = req.params;
        const { mecanico_id } = req.body;
        
        if (!mecanico_id) {
            return res.status(400).json({ error: 'El ID del mecánico es requerido' });
        }
        
        const detalle = await DetalleOrden.updateMecanico(id, mecanico_id);
        
        if (!detalle) {
            return res.status(404).json({ error: 'Detalle de orden no encontrado' });
        }
        
        res.json(detalle);
    } catch (error) {
        console.error('Error al actualizar mecánico:', error);
        res.status(500).json({ error: 'Error al actualizar el mecánico del detalle' });
    }
};

// Eliminar un detalle
const deleteDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await DetalleOrden.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Detalle de orden no encontrado' });
        }
        
        res.json({ message: 'Detalle de orden eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar detalle:', error);
        res.status(500).json({ error: 'Error al eliminar el detalle de orden' });
    }
};

// Nuevo endpoint para actualizar el estado de un detalle
const updateEstadoDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        if (!estado) {
            return res.status(400).json({ error: 'El estado es requerido' });
        }
        const detalle = await DetalleOrden.updateEstado(id, estado);
        if (!detalle) {
            return res.status(404).json({ error: 'Detalle de orden no encontrado' });
        }
        if (estado === 'completado') {
            const detalles = await DetalleOrden.findByOrden(detalle.orden_id);
            const orden = await OrdenServicio.findById(detalle.orden_id);
            if (orden && orden.estado === 'abierta') {
                const algunoCompletado = detalles.some(d => d.estado === 'completado');
                if (algunoCompletado) {
                    await OrdenServicio.updateEstado(detalle.orden_id, 'en progreso');
                }
            }
        }
        res.json(detalle);
    } catch (error) {
        console.error('Error al actualizar estado del detalle:', error);
        res.status(500).json({ error: 'Error al actualizar el estado del detalle' });
    }
};

module.exports = {
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
}; 