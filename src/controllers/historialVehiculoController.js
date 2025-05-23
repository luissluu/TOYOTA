const HistorialVehiculo = require('../entities/HistorialVehiculo');


// Obtener todo el historial
const getAllHistorial = async (req, res) => {
    try {
        const historial = await HistorialVehiculo.findAll();
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener historial:', error);
        res.status(500).json({ error: 'Error al obtener el historial de vehículos' });
    }
};

// Obtener un registro del historial por ID
const getHistorialById = async (req, res) => {
    try {
        const { id } = req.params;
        const historial = await HistorialVehiculo.findById(id);
        
        if (!historial) {
            return res.status(404).json({ error: 'Registro de historial no encontrado' });
        }
        
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener registro de historial:', error);
        res.status(500).json({ error: 'Error al obtener el registro de historial' });
    }
};

// Obtener historial por vehículo
const getHistorialByVehiculo = async (req, res) => {
    try {
        const { vehiculoId } = req.params;
        const historial = await HistorialVehiculo.findByVehiculo(vehiculoId);
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener historial del vehículo:', error);
        res.status(500).json({ error: 'Error al obtener el historial del vehículo' });
    }
};

// Obtener historial por orden
const getHistorialByOrden = async (req, res) => {
    try {
        const { ordenId } = req.params;
        const historial = await HistorialVehiculo.findByOrden(ordenId);
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener historial de la orden:', error);
        res.status(500).json({ error: 'Error al obtener el historial de la orden' });
    }
};

// Obtener historial por mecánico
const getHistorialByMecanico = async (req, res) => {
    try {
        const { mecanicoId } = req.params;
        const historial = await HistorialVehiculo.findByMecanico(mecanicoId);
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener historial del mecánico:', error);
        res.status(500).json({ error: 'Error al obtener el historial del mecánico' });
    }
};

// Obtener historial por rango de fechas
const getHistorialByFecha = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ error: 'Se requieren las fechas de inicio y fin' });
        }
        
        const historial = await HistorialVehiculo.findByFecha(fechaInicio, fechaFin);
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener historial por fecha:', error);
        res.status(500).json({ error: 'Error al obtener el historial por fecha' });
    }
};

// Crear un nuevo registro en el historial
const createHistorial = async (req, res) => {
    try {
        const historial = await HistorialVehiculo.create(req.body);
        res.status(201).json(historial);
    } catch (error) {
        console.error('Error al crear registro de historial:', error);
        if (error.message === 'El vehículo, orden o usuario especificado no existe') {
            return res.status(400).json({ error: error.message });
        }
        if (error.message === 'El mecánico especificado no existe' || 
            error.message === 'El usuario especificado no es un mecánico') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al crear el registro de historial' });
    }
};

// Actualizar un registro del historial
const updateHistorial = async (req, res) => {
    try {
        const { id } = req.params;
        const historial = await HistorialVehiculo.update(id, req.body);
        
        if (!historial) {
            return res.status(404).json({ error: 'Registro de historial no encontrado' });
        }
        
        res.json(historial);
    } catch (error) {
        console.error('Error al actualizar registro de historial:', error);
        if (error.message === 'El mecánico especificado no existe' || 
            error.message === 'El usuario especificado no es un mecánico') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al actualizar el registro de historial' });
    }
};

// Eliminar un registro del historial
const deleteHistorial = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await HistorialVehiculo.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Registro de historial no encontrado' });
        }
        
        res.json({ message: 'Registro de historial eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar registro de historial:', error);
        res.status(500).json({ error: 'Error al eliminar el registro de historial' });
    }
};



module.exports = {
    getAllHistorial,
    getHistorialById,
    getHistorialByVehiculo,
    getHistorialByOrden,
    getHistorialByMecanico,
    getHistorialByFecha,
    createHistorial,
    updateHistorial,
    deleteHistorial
}; 