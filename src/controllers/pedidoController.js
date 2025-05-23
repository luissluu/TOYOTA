const Pedido = require('../entities/Pedido');

// Obtener todos los pedidos
const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        res.json(pedidos);
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
};

// Obtener un pedido por ID
const getPedidoById = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findById(id);
        
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        
        res.json(pedido);
    } catch (error) {
        console.error('Error al obtener pedido:', error);
        res.status(500).json({ error: 'Error al obtener el pedido' });
    }
};

// Obtener pedidos por proveedor
const getPedidosByProveedor = async (req, res) => {
    try {
        const { proveedorId } = req.params;
        const pedidos = await Pedido.findByProveedor(proveedorId);
        res.json(pedidos);
    } catch (error) {
        console.error('Error al obtener pedidos del proveedor:', error);
        res.status(500).json({ error: 'Error al obtener los pedidos del proveedor' });
    }
};

// Obtener pedidos por usuario
const getPedidosByUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const pedidos = await Pedido.findByUsuario(usuarioId);
        res.json(pedidos);
    } catch (error) {
        console.error('Error al obtener pedidos del usuario:', error);
        res.status(500).json({ error: 'Error al obtener los pedidos del usuario' });
    }
};

// Crear un nuevo pedido
const createPedido = async (req, res) => {
    try {
        const pedido = await Pedido.create(req.body);
        res.status(201).json(pedido);
    } catch (error) {
        console.error('Error al crear pedido:', error);
        if (error.message === 'El proveedor o usuario especificado no existe') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al crear el pedido' });
    }
};

// Actualizar un pedido
const updatePedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.update(id, req.body);
        
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        
        res.json(pedido);
    } catch (error) {
        console.error('Error al actualizar pedido:', error);
        res.status(500).json({ error: 'Error al actualizar el pedido' });
    }
};

// Actualizar el total de un pedido
const updateTotal = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.updateTotal(id);
        
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        
        res.json(pedido);
    } catch (error) {
        console.error('Error al actualizar total:', error);
        res.status(500).json({ error: 'Error al actualizar el total del pedido' });
    }
};

// Eliminar un pedido
const deletePedido = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Pedido.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        
        res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar pedido:', error);
        res.status(500).json({ error: 'Error al eliminar el pedido' });
    }
};

module.exports = {
    getAllPedidos,
    getPedidoById,
    getPedidosByProveedor,
    getPedidosByUsuario,
    createPedido,
    updatePedido,
    updateTotal,
    deletePedido
}; 