const Vehiculo = require('../entities/vehiculo');

const vehiculoController = {
    async create(req, res) {
        try {
            if (req.body.vin && !isValidVin(req.body.vin)) {
                return res.status(400).json({
                    message: 'Formato de VIN inválido'
                });
            }
            
            // Verificar si el VIN ya existe
            if (req.body.vin) {
                const vehiculoExistente = await Vehiculo.findByVin(req.body.vin);
                
                if (vehiculoExistente) {
                    return res.status(400).json({
                        message: 'Ya existe un vehículo con ese VIN'
                    });
                }
            }
    
            const vehiculo = await Vehiculo.create(req.body);
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

    async getByVin(req, res) {
        try {
            const vehiculo = await Vehiculo.findByVin(req.params.vin);
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

function isValidVin(vin) {
    // Implementación básica: verificar longitud y caracteres
    return /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
}

module.exports = vehiculoController;