const Cita = require('../entities/Cita');

// Obtener todas las citas
const getAllCitas = async (req, res) => {
    try {
        const citas = await Cita.findAll();
        res.json(citas);
    } catch (error) {
        console.error('Error al obtener citas:', error);
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
};

// Obtener una cita por ID
const getCitaById = async (req, res) => {
    try {
        const { id } = req.params;
        const cita = await Cita.findById(id);
        
        if (!cita) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        
        res.json(cita);
    } catch (error) {
        console.error('Error al obtener cita:', error);
        res.status(500).json({ error: 'Error al obtener la cita' });
    }
};

// Obtener citas por usuario
const getCitasByUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const citas = await Cita.findByUsuario(usuarioId);
        res.json(citas);
    } catch (error) {
        console.error('Error al obtener citas del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las citas del usuario' });
    }
};

// Obtener citas por vehículo
const getCitasByVehiculo = async (req, res) => {
    try {
        const { vehiculoId } = req.params;
        const citas = await Cita.findByVehiculo(vehiculoId);
        res.json(citas);
    } catch (error) {
        console.error('Error al obtener citas del vehículo:', error);
        res.status(500).json({ error: 'Error al obtener las citas del vehículo' });
    }
};

// Obtener citas por fecha
const getCitasByFecha = async (req, res) => {
    try {
        const { fecha } = req.params;
        const citas = await Cita.findByFecha(fecha);
        res.json(citas);
    } catch (error) {
        console.error('Error al obtener citas por fecha:', error);
        res.status(500).json({ error: 'Error al obtener las citas por fecha' });
    }
};

// Crear una nueva cita
const createCita = async (req, res) => {
    try {
        console.log('Datos recibidos para crear cita:', req.body);
        const cita = await Cita.create(req.body);
        res.status(201).json(cita);
    } catch (error) {
        console.error('Error al crear cita:', error);
        if (error.message === 'El usuario o vehículo especificado no existe') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al crear la cita', detalle: error.message });
    }
};

// Actualizar una cita
const updateCita = async (req, res) => {
    try {
        const { id } = req.params;
        const cita = await Cita.update(id, req.body);
        
        if (!cita) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        
        res.json(cita);
    } catch (error) {
        console.error('Error al actualizar cita:', error);
        res.status(500).json({ error: 'Error al actualizar la cita' });
    }
};

// Actualizar estado de una cita
const updateEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        
        if (!estado) {
            return res.status(400).json({ error: 'El estado es requerido' });
        }
        
        const cita = await Cita.updateEstado(id, estado);
        
        if (!cita) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        
        res.json(cita);
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        res.status(500).json({ error: 'Error al actualizar el estado de la cita' });
    }
};

// Eliminar una cita
const deleteCita = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Cita.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        
        res.json({ message: 'Cita eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar cita:', error);
        res.status(500).json({ error: 'Error al eliminar la cita' });
    }
};

module.exports = {
    getAllCitas,
    getCitaById,
    getCitasByUsuario,
    getCitasByVehiculo,
    getCitasByFecha,
    createCita,
    updateCita,
    updateEstado,
    deleteCita
}; 