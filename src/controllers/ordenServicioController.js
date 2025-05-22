const OrdenServicio = require('../entities/OrdenServicio');
const DetalleOrden = require('../entities/DetalleOrden');
const Servicio = require('../entities/servicio');

// Obtener todas las órdenes de servicio
const getAllOrdenes = async (req, res) => {
    try {
        const ordenes = await OrdenServicio.findAll();
        res.json(ordenes);
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        res.status(500).json({ error: 'Error al obtener las órdenes de servicio' });
    }
};

// Obtener una orden por ID
const getOrdenById = async (req, res) => {
    try {
        const { id } = req.params;
        const orden = await OrdenServicio.findById(id);
        
        if (!orden) {
            return res.status(404).json({ error: 'Orden de servicio no encontrada' });
        }
        
        res.json(orden);
    } catch (error) {
        console.error('Error al obtener orden:', error);
        res.status(500).json({ error: 'Error al obtener la orden de servicio' });
    }
};

// Obtener órdenes por usuario
const getOrdenesByUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const ordenes = await OrdenServicio.findByUsuario(usuarioId);
        res.json(ordenes);
    } catch (error) {
        console.error('Error al obtener órdenes del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las órdenes del usuario' });
    }
};

// Obtener órdenes por vehículo
const getOrdenesByVehiculo = async (req, res) => {
    try {
        const { vehiculoId } = req.params;
        const ordenes = await OrdenServicio.findByVehiculo(vehiculoId);
        res.json(ordenes);
    } catch (error) {
        console.error('Error al obtener órdenes del vehículo:', error);
        res.status(500).json({ error: 'Error al obtener las órdenes del vehículo' });
    }
};

// Obtener órdenes por estado
const getOrdenesByEstado = async (req, res) => {
    try {
        const { estado } = req.params;
        const ordenes = await OrdenServicio.findByEstado(estado);
        res.json(ordenes);
    } catch (error) {
        console.error('Error al obtener órdenes por estado:', error);
        res.status(500).json({ error: 'Error al obtener las órdenes por estado' });
    }
};

// Crear una nueva orden de servicio
const createOrden = async (req, res) => {
    try {
        // Crear la orden principal
        const { servicios, ...ordenData } = req.body;
        const orden = await OrdenServicio.create(ordenData);
        // Crear los detalles de la orden para cada servicio
        if (Array.isArray(servicios)) {
            for (const s of servicios) {
                // Obtener el precio del servicio
                const servicio = await Servicio.findById(s.id);
                const precio = servicio ? servicio.precio_estimado : 0;
                await DetalleOrden.create({
                    orden_id: orden.orden_id,
                    servicio_id: s.id,
                    mecanico_id: s.mecanico_id || null,
                    estado: 'pendiente',
                    descripcion: '',
                    precio: precio,
                    notas: ''
                });
            }
        }
        res.status(201).json(orden);
    } catch (error) {
        console.error('Error al crear orden:', error);
        if (error.message === 'El usuario, vehículo o cita especificada no existe') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al crear la orden de servicio' });
    }
};

// Actualizar una orden de servicio
const updateOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const orden = await OrdenServicio.update(id, req.body);
        
        if (!orden) {
            return res.status(404).json({ error: 'Orden de servicio no encontrada' });
        }
        
        res.json(orden);
    } catch (error) {
        console.error('Error al actualizar orden:', error);
        res.status(500).json({ error: 'Error al actualizar la orden de servicio' });
    }
};

// Actualizar estado de una orden
const updateEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        
        if (!estado) {
            return res.status(400).json({ error: 'El estado es requerido' });
        }
        
        const orden = await OrdenServicio.updateEstado(id, estado);
        
        if (!orden) {
            return res.status(404).json({ error: 'Orden de servicio no encontrada' });
        }
        
        res.json(orden);
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        res.status(500).json({ error: 'Error al actualizar el estado de la orden' });
    }
};

// Actualizar total de una orden
const updateTotal = async (req, res) => {
    try {
        const { id } = req.params;
        const { total } = req.body;
        
        if (total === undefined) {
            return res.status(400).json({ error: 'El total es requerido' });
        }
        
        const orden = await OrdenServicio.updateTotal(id, total);
        
        if (!orden) {
            return res.status(404).json({ error: 'Orden de servicio no encontrada' });
        }
        
        res.json(orden);
    } catch (error) {
        console.error('Error al actualizar total:', error);
        res.status(500).json({ error: 'Error al actualizar el total de la orden' });
    }
};

// Eliminar una orden de servicio
const deleteOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await OrdenServicio.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Orden de servicio no encontrada' });
        }
        
        res.json({ message: 'Orden de servicio eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar orden:', error);
        res.status(500).json({ error: 'Error al eliminar la orden de servicio' });
    }
};

module.exports = {
    getAllOrdenes,
    getOrdenById,
    getOrdenesByUsuario,
    getOrdenesByVehiculo,
    getOrdenesByEstado,
    createOrden,
    updateOrden,
    updateEstado,
    updateTotal,
    deleteOrden
}; 