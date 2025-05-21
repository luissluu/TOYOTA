const Vehiculo = require('../entities/vehiculo');

const vehiculoController = {
    async create(req, res) {
        try {
            // Verificar si la placa ya existe
            const vehiculoExistente = await Vehiculo.findByPlaca(req.body.placa);
            
            if (vehiculoExistente) {
                return res.status(400).json({
                    message: 'Ya existe un vehículo con esa placa'
                });
            }

            // Asignar el usuario_id del usuario autenticado
            const vehiculoData = {
                ...req.body,
                usuario_id: req.user.id
            };

            const vehiculo = await Vehiculo.create(vehiculoData);
            res.status(201).json({
                message: 'Vehículo creado exitosamente',
                vehiculo
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear vehículo',
                error: error.message
            });
        }
    },

    async getAll(req, res) {
        try {
            const vehiculos = await Vehiculo.findAll();
            res.json(vehiculos);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener vehículos',
                error: error.message
            });
        }
    },

    async getById(req, res) {
        try {
            const vehiculo = await Vehiculo.findById(req.params.id);
            if (!vehiculo) {
                return res.status(404).json({
                    message: 'Vehículo no encontrado'
                });
            }
            res.json(vehiculo);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener vehículo',
                error: error.message
            });
        }
    },

    async update(req, res) {
        try {
            // Si se está actualizando la placa, verificar que no exista
            if (req.body.placa) {
                const vehiculoExistente = await Vehiculo.findByPlaca(req.body.placa);
                if (vehiculoExistente && vehiculoExistente.vehiculo_id !== parseInt(req.params.id)) {
                    return res.status(400).json({
                        message: 'Ya existe un vehículo con esa placa'
                    });
                }
            }

            const vehiculo = await Vehiculo.update(req.params.id, req.body);
            if (!vehiculo) {
                return res.status(404).json({
                    message: 'Vehículo no encontrado'
                });
            }
            res.json({
                message: 'Vehículo actualizado exitosamente',
                vehiculo
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar vehículo',
                error: error.message
            });
        }
    },

    async delete(req, res) {
        try {
            const result = await Vehiculo.delete(req.params.id);
            if (!result) {
                return res.status(404).json({
                    message: 'Vehículo no encontrado'
                });
            }
            res.json({
                message: 'Vehículo eliminado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar vehículo',
                error: error.message
            });
        }
    }
};

module.exports = vehiculoController;