const OrdenServicio = require('../entities/ordenServicio');

const ordenServicioController = {
    async create(req, res) {
        try {
            const ordenData = {
                ...req.body,
                creado_por: req.user?.id || req.body.creado_por
            };

            const orden = await OrdenServicio.create(ordenData);
            res.status(201).json({
                message: 'Orden de servicio creada exitosamente',
                orden
            });
        } catch (error) {
            console.error('Error al crear orden de servicio:', error);
            res.status(500).json({
                message: 'Error al crear orden de servicio',
                error: error.message
            });
        }
    },

    async getAll(req, res) {
        try {
            const ordenes = await OrdenServicio.findAll();
            res.json(ordenes);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener órdenes de servicio',
                error: error.message
            });
        }
    },

    async getById(req, res) {
        try {
            const orden = await OrdenServicio.findById(req.params.id);
            if (!orden) {
                return res.status(404).json({
                    message: 'Orden de servicio no encontrada'
                });
            }
            res.json(orden);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener orden de servicio',
                error: error.message
            });
        }
    },

    async getByUsuario(req, res) {
        try {
            const ordenes = await OrdenServicio.findByUsuario(req.params.usuarioId);
            res.json(ordenes);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener órdenes de servicio del usuario',
                error: error.message
            });
        }
    },

    async update(req, res) {
        try {
            const orden = await OrdenServicio.update(req.params.id, req.body);
            if (!orden) {
                return res.status(404).json({
                    message: 'Orden de servicio no encontrada'
                });
            }
            res.json({
                message: 'Orden de servicio actualizada exitosamente',
                orden
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar orden de servicio',
                error: error.message
            });
        }
    },

    async finalizar(req, res) {
        try {
            const orden = await OrdenServicio.finalizar(req.params.id, req.body);
            if (!orden) {
                return res.status(404).json({
                    message: 'Orden de servicio no encontrada'
                });
            }
            res.json({
                message: 'Orden de servicio finalizada exitosamente',
                orden
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al finalizar orden de servicio',
                error: error.message
            });
        }
    },

    async delete(req, res) {
        try {
            const result = await OrdenServicio.delete(req.params.id);
            if (!result) {
                return res.status(404).json({
                    message: 'Orden de servicio no encontrada'
                });
            }
            res.json({
                message: 'Orden de servicio eliminada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar orden de servicio',
                error: error.message
            });
        }
    },

    async addDetalle(req, res) {
        try {
            const detalle = await OrdenServicio.addDetalle(req.params.id, req.body);
            res.status(201).json({
                message: 'Detalle agregado exitosamente a la orden',
                detalle
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al agregar detalle a la orden',
                error: error.message
            });
        }
    },

    async updateDetalle(req, res) {
        try {
            const detalle = await OrdenServicio.updateDetalle(req.params.detalleId, req.body);
            if (!detalle) {
                return res.status(404).json({
                    message: 'Detalle de orden no encontrado'
                });
            }
            res.json({
                message: 'Detalle de orden actualizado exitosamente',
                detalle
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar detalle de orden',
                error: error.message
            });
        }
    },

    async deleteDetalle(req, res) {
        try {
            const result = await OrdenServicio.deleteDetalle(req.params.detalleId);
            if (!result) {
                return res.status(404).json({
                    message: 'Detalle de orden no encontrado'
                });
            }
            res.json({
                message: 'Detalle de orden eliminado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar detalle de orden',
                error: error.message
            });
        }
    }
};

module.exports = ordenServicioController;