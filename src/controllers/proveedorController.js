const Proveedor = require('../entities/proveedor');

const proveedorController = {
    async create(req, res) {
        try {
            const proveedor = await Proveedor.create(req.body);
            res.status(201).json({
                message: 'Proveedor creado exitosamente',
                proveedor
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear proveedor',
                error: error.message
            });
        }
    },

    async getAll(req, res) {
        try {
            const proveedores = await Proveedor.findAll();
            res.json(proveedores);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener proveedores',
                error: error.message
            });
        }
    },

    async getById(req, res) {
        try {
            const proveedor = await Proveedor.findById(req.params.id);
            if (!proveedor) {
                return res.status(404).json({
                    message: 'Proveedor no encontrado'
                });
            }
            res.json(proveedor);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener proveedor',
                error: error.message
            });
        }
    },

    async update(req, res) {
        try {
            const proveedor = await Proveedor.update(req.params.id, req.body);
            if (!proveedor) {
                return res.status(404).json({
                    message: 'Proveedor no encontrado'
                });
            }
            res.json({
                message: 'Proveedor actualizado exitosamente',
                proveedor
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar proveedor',
                error: error.message
            });
        }
    },

    async delete(req, res) {
        try {
            const result = await Proveedor.delete(req.params.id);
            if (!result) {
                return res.status(404).json({
                    message: 'Proveedor no encontrado'
                });
            }
            res.json({
                message: 'Proveedor eliminado exitosamente'
            });
        } catch (error) {
            let status = 500;
            let message = 'Error al eliminar proveedor';
            
            if (error.message.includes('No se puede eliminar un proveedor con pedidos')) {
                status = 400;
                message = error.message;
            }
            
            res.status(status).json({
                message,
                error: error.message
            });
        }
    },

    async search(req, res) {
        try {
            const proveedores = await Proveedor.search(req.query.q);
            res.json(proveedores);
        } catch (error) {
            res.status(500).json({
                message: 'Error al buscar proveedores',
                error: error.message
            });
        }
    }
};

module.exports = proveedorController;