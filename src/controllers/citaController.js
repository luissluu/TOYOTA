const Cita = require('../entities/cita');

const citaController = {
    async create(req, res) {
        try {
            const citaData = {
                ...req.body,
                creado_por: req.user?.id || req.body.creado_por 
            };

            const cita = await Cita.create(citaData);
            res.status(201).json({
                message: 'Cita creada exitosamente',
                cita
            });
        } catch (error) {
            console.error('Error al crear cita:', error);
            res.status(500).json({
                message: 'Error al crear cita',
                error: error.message
            });
        }
    },

    async getAll(req, res) {
        try {
            const citas = await Cita.findAll();
            res.json(citas);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener citas',
                error: error.message
            });
        }
    },

    async getById(req, res) {
        try {
            const cita = await Cita.findById(req.params.id);
            if (!cita) {
                return res.status(404).json({
                    message: 'Cita no encontrada'
                });
            }
            res.json(cita);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener cita',
                error: error.message
            });
        }
    },

    async getByUsuario(req, res) {
        try {
            const citas = await Cita.findByUsuario(req.params.usuarioId);
            res.json(citas);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener citas del usuario',
                error: error.message
            });
        }
    },

    async getByFecha(req, res) {
        try {
            const citas = await Cita.findByFecha(req.params.fecha);
            res.json(citas);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener citas por fecha',
                error: error.message
            });
        }
    },

    async update(req, res) {
        try {
            const cita = await Cita.update(req.params.id, req.body);
            if (!cita) {
                return res.status(404).json({
                    message: 'Cita no encontrada'
                });
            }
            res.json({
                message: 'Cita actualizada exitosamente',
                cita
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar cita',
                error: error.message
            });
        }
    },

    async updateEstado(req, res) {
        try {
            const result = await Cita.updateEstado(req.params.id, req.body.estado);
            if (!result) {
                return res.status(404).json({
                    message: 'Cita no encontrada'
                });
            }
            const cita = await Cita.findById(req.params.id);
            res.json({
                message: 'Estado de cita actualizado exitosamente',
                cita
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar estado de la cita',
                error: error.message
            });
        }
    },

    async delete(req, res) {
        try {
            const result = await Cita.delete(req.params.id);
            if (!result) {
                return res.status(404).json({
                    message: 'Cita no encontrada'
                });
            }
            res.json({
                message: 'Cita eliminada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar cita',
                error: error.message
            });
        }
    }
};

module.exports = citaController;