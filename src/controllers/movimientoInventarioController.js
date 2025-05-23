const MovimientoInventario = require('../entities/MovimientoInventario');

// Obtener todos los movimientos
const getAllMovimientos = async (req, res) => {
    try {
        const movimientos = await MovimientoInventario.findAll();
        res.json(movimientos);
    } catch (error) {
        console.error('Error al obtener movimientos:', error);
        res.status(500).json({ error: 'Error al obtener los movimientos de inventario' });
    }
};

// Obtener un movimiento por ID
const getMovimientoById = async (req, res) => {
    try {
        const { id } = req.params;
        const movimiento = await MovimientoInventario.findById(id);
        
        if (!movimiento) {
            return res.status(404).json({ error: 'Movimiento no encontrado' });
        }
        
        res.json(movimiento);
    } catch (error) {
        console.error('Error al obtener movimiento:', error);
        res.status(500).json({ error: 'Error al obtener el movimiento' });
    }
};

// Obtener movimientos por artículo
const getMovimientosByArticulo = async (req, res) => {
    try {
        const { articuloId } = req.params;
        const movimientos = await MovimientoInventario.findByArticulo(articuloId);
        res.json(movimientos);
    } catch (error) {
        console.error('Error al obtener movimientos del artículo:', error);
        res.status(500).json({ error: 'Error al obtener los movimientos del artículo' });
    }
};

// Obtener movimientos por tipo
const getMovimientosByTipo = async (req, res) => {
    try {
        const { tipo } = req.params;
        const movimientos = await MovimientoInventario.findByTipoMovimiento(tipo);
        res.json(movimientos);
    } catch (error) {
        console.error('Error al obtener movimientos por tipo:', error);
        res.status(500).json({ error: 'Error al obtener los movimientos por tipo' });
    }
};

// Obtener movimientos por orden
const getMovimientosByOrden = async (req, res) => {
    try {
        const { ordenId } = req.params;
        const movimientos = await MovimientoInventario.findByOrden(ordenId);
        res.json(movimientos);
    } catch (error) {
        console.error('Error al obtener movimientos de la orden:', error);
        res.status(500).json({ error: 'Error al obtener los movimientos de la orden' });
    }
};

// Obtener movimientos por proveedor
const getMovimientosByProveedor = async (req, res) => {
    try {
        const { proveedorId } = req.params;
        const movimientos = await MovimientoInventario.findByProveedor(proveedorId);
        res.json(movimientos);
    } catch (error) {
        console.error('Error al obtener movimientos del proveedor:', error);
        res.status(500).json({ error: 'Error al obtener los movimientos del proveedor' });
    }
};

// Obtener movimientos por usuario
const getMovimientosByUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const movimientos = await MovimientoInventario.findByUsuario(usuarioId);
        res.json(movimientos);
    } catch (error) {
        console.error('Error al obtener movimientos del usuario:', error);
        res.status(500).json({ error: 'Error al obtener los movimientos del usuario' });
    }
};

// Obtener movimientos por rango de fechas
const getMovimientosByFecha = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ error: 'Se requieren las fechas de inicio y fin' });
        }
        
        const movimientos = await MovimientoInventario.findByFecha(fechaInicio, fechaFin);
        res.json(movimientos);
    } catch (error) {
        console.error('Error al obtener movimientos por fecha:', error);
        res.status(500).json({ error: 'Error al obtener los movimientos por fecha' });
    }
};

// Crear un nuevo movimiento
// Crear un nuevo movimiento
const createMovimiento = async (req, res) => {
    try {
        console.log('Datos recibidos en createMovimiento:', req.body);
        const movimiento = await MovimientoInventario.create(req.body);
        res.status(201).json(movimiento);
    } catch (error) {
        console.error('Error al crear movimiento:', error);
        if (error.message === 'El artículo, orden, proveedor o usuario especificado no existe') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al crear el movimiento' });
    }
};

// Actualizar un movimiento
const updateMovimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const movimiento = await MovimientoInventario.update(id, req.body);
        
        if (!movimiento) {
            return res.status(404).json({ error: 'Movimiento no encontrado' });
        }
        
        res.json(movimiento);
    } catch (error) {
        console.error('Error al actualizar movimiento:', error);
        res.status(500).json({ error: 'Error al actualizar el movimiento' });
    }
};

// Eliminar un movimiento
const deleteMovimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await MovimientoInventario.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Movimiento no encontrado' });
        }
        
        res.json({ message: 'Movimiento eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar movimiento:', error);
        res.status(500).json({ error: 'Error al eliminar el movimiento' });
    }
};



module.exports = {

    
    getAllMovimientos,
    getMovimientoById,
    getMovimientosByArticulo,
    getMovimientosByTipo,
    getMovimientosByOrden,
    getMovimientosByProveedor,
    getMovimientosByUsuario,
    getMovimientosByFecha,
    createMovimiento,
    updateMovimiento,
    deleteMovimiento
}; 