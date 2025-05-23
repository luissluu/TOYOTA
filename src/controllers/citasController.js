const Cita = require('../entities/Cita');
const { enviarCorreo } = require('../utils/email');
const Usuario = require('../entities/Usuario');

// Obtener todas las citas
const getAllCitas = async (req, res) => {
    try {
        const { estado } = req.query;
        let citas;
        
        if (estado) {
            citas = await Cita.findByEstado(estado);
        } else {
            citas = await Cita.findAll();
        }
        
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
        console.log('Buscando citas para usuario:', req.params.usuarioId);
        const citas = await Cita.findByUsuario(req.params.usuarioId);
        res.json(citas);
    } catch (error) {
        console.error('Error al obtener citas del usuario:', error, error.stack);
        res.status(500).json({ error: 'Error al obtener las citas del usuario', detalle: error.message, stack: error.stack });
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
        // Asignar el usuario_id del usuario autenticado
        const citaData = {
            ...req.body,
            usuario_id: req.usuario.id
        };
        // Eliminar cualquier referencia a creado_por si existe
        delete citaData.creado_por;
        const cita = await Cita.create(citaData);
        // Obtener el correo del usuario
        const usuario = await Usuario.findById(req.usuario.id);
        if (usuario && usuario.correoElectronico) {
            const html = `
              <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 32px;">
                <div style="max-width: 500px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); overflow: hidden;">
                  <div style="background: linear-gradient(90deg, #EB0A1E 0%, #222 100%); padding: 24px 0; text-align: center;">
                    <!--<img src="https://toyota-one.vercel.app/Logo.png" alt="Toyota" style="width: 80px; height: 80px; margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto;" />-->
                    <h1 style="color: #fff; margin: 0; font-size: 1.7rem;">Toyota Taller Mecánico</h1>
                  </div>
                  <div style="padding: 32px 24px 24px 24px; text-align: center;">
                    <h2 style="color: #EB0A1E; margin-bottom: 16px;">¡Cita registrada!</h2>
                    <p style="color: #333; font-size: 1.1rem; margin-bottom: 24px;">
                      Hola <b>${usuario.nombre}</b>,<br>
                      Tu cita ha sido registrada exitosamente.
                    </p>
                    <p style="color: #666; font-size: 1rem; margin-bottom: 24px;">
                      <b>Fecha y hora:</b> ${cita.fecha}<br>
                      <b>Tipo de servicio:</b> ${cita.tipo_servicio}
                    </p>
                    <p style="color: #666; font-size: 1rem;">
                      ¡Te esperamos en Toyota Taller!
                    </p>
                  </div>
                  <div style="background: #f4f4f4; color: #888; font-size: 0.9rem; padding: 16px; text-align: center; border-top: 1px solid #eee;">
                    &copy; ${new Date().getFullYear()} Toyota Taller Mecánico
                  </div>
                </div>
              </div>
            `;
            await enviarCorreo(usuario.correoElectronico, 'Confirmación de cita - Toyota Taller', html);
        }
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