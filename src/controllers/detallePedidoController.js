const DetallePedido = require('../entities/DetallePedido');
const Pedido = require('../entities/Pedido');

// Obtener todos los detalles
const getAllDetalles = async (req, res) => {
    try {
        const detalles = await DetallePedido.findAll();
        res.json(detalles);
    } catch (error) {
        console.error('Error al obtener detalles:', error);
        res.status(500).json({ error: 'Error al obtener los detalles de pedido' });
    }
};

// Obtener un detalle por ID
const getDetalleById = async (req, res) => {
    try {
        const { id } = req.params;
        const detalle = await DetallePedido.findById(id);
        
        if (!detalle) {
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }
        
        res.json(detalle);
    } catch (error) {
        console.error('Error al obtener detalle:', error);
        res.status(500).json({ error: 'Error al obtener el detalle de pedido' });
    }
};

// Obtener detalles por pedido
const getDetallesByPedido = async (req, res) => {
    try {
        const { pedidoId } = req.params;
        const detalles = await DetallePedido.findByPedido(pedidoId);
        res.json(detalles);
    } catch (error) {
        console.error('Error al obtener detalles del pedido:', error);
        res.status(500).json({ error: 'Error al obtener los detalles del pedido' });
    }
};

// Obtener detalles por artículo
const getDetallesByArticulo = async (req, res) => {
    try {
        const { articuloId } = req.params;
        const detalles = await DetallePedido.findByArticulo(articuloId);
        res.json(detalles);
    } catch (error) {
        console.error('Error al obtener detalles del artículo:', error);
        res.status(500).json({ error: 'Error al obtener los detalles del artículo' });
    }
};

// Obtener detalles por estado
const getDetallesByEstado = async (req, res) => {
    try {
        const { estado } = req.params;
        const detalles = await DetallePedido.findByEstado(estado);
        res.json(detalles);
    } catch (error) {
        console.error('Error al obtener detalles por estado:', error);
        res.status(500).json({ error: 'Error al obtener los detalles por estado' });
    }
};

// Crear un nuevo detalle
const createDetalle = async (req, res) => {
    try {
        const detalle = await DetallePedido.create(req.body);
        
        // Actualizar el total del pedido
        await Pedido.updateTotal(detalle.pedido_id);
        
        res.status(201).json(detalle);
    } catch (error) {
        console.error('Error al crear detalle:', error);
        if (error.message === 'El pedido o artículo especificado no existe') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al crear el detalle de pedido' });
    }
};

// Actualizar un detalle
const updateDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const detalle = await DetallePedido.update(id, req.body);
        
        if (!detalle) {
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }
        
        // Actualizar el total del pedido
        await Pedido.updateTotal(detalle.pedido_id);
        
        res.json(detalle);
    } catch (error) {
        console.error('Error al actualizar detalle:', error);
        res.status(500).json({ error: 'Error al actualizar el detalle de pedido' });
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
        
        const detalle = await DetallePedido.updateEstado(id, estado);
        
        if (!detalle) {
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }
        
        res.json(detalle);
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        res.status(500).json({ error: 'Error al actualizar el estado del detalle' });
    }
};

// Actualizar cantidad recibida
const updateCantidadRecibida = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        
        if (!cantidad) {
            return res.status(400).json({ error: 'La cantidad es requerida' });
        }
        
        const detalle = await DetallePedido.updateCantidadRecibida(id, cantidad);
        
        if (!detalle) {
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }
        
        res.json(detalle);
    } catch (error) {
        console.error('Error al actualizar cantidad recibida:', error);
        res.status(500).json({ error: 'Error al actualizar la cantidad recibida' });
    }
};

// Eliminar un detalle
const deleteDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const detalle = await DetallePedido.findById(id);
        
        if (!detalle) {
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }
        
        const deleted = await DetallePedido.delete(id);
        
        // Actualizar el total del pedido
        await Pedido.updateTotal(detalle.pedido_id);
        
        res.json({ message: 'Detalle de pedido eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar detalle:', error);
        res.status(500).json({ error: 'Error al eliminar el detalle de pedido' });
    }
};

module.exports = {
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
}; 