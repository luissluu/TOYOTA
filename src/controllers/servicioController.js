const Servicio = require('../entities/servicio');

const servicioController = {
    async create(req, res) {
        try {
            const servicio = await Servicio.create(req.body);
            res.status(201).json({
                message: 'Servicio creado exitosamente',
                servicio
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear servicio',
                error: error.message
            });
        }
    },

    async getAll(req, res) {
        try {
            const servicios = await Servicio.findAll();
            res.json(servicios);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener servicios',
                error: error.message
            });
        }
    },

    async getById(req, res) {
        try {
            const servicio = await Servicio.findById(req.params.id);
            if (!servicio) {
                return res.status(404).json({
                    message: 'Servicio no encontrado'
                });
            }
            res.json(servicio);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener servicio',
                error: error.message
            });
        }
    },

    async getByCategoria(req, res) {
        try {
            const servicios = await Servicio.findByCategoria(req.params.categoria);
            res.json(servicios);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener servicios por categoría',
                error: error.message
            });
        }
    },

    async update(req, res) {
        try {
            const servicio = await Servicio.update(req.params.id, req.body);
            if (!servicio) {
                return res.status(404).json({
                    message: 'Servicio no encontrado'
                });
            }
            res.json({
                message: 'Servicio actualizado exitosamente',
                servicio
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar servicio',
                error: error.message
            });
        }
    },

    async delete(req, res) {
        try {
            const result = await Servicio.delete(req.params.id);
            if (!result) {
                return res.status(404).json({
                    message: 'Servicio no encontrado'
                });
            }
            res.json({
                message: 'Servicio eliminado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar servicio',
                error: error.message
            });
        }
    }
};

module.exports = servicioController;