const Rol = require('../entities/rol.js');

const rolController = {
    async getAll(req, res) {
        try {
            const roles = await Rol.findAll();
            res.json(roles);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener roles',
                error: error.message
            });
        }
    },

    async getById(req, res) {
        try {
            const rol = await Rol.findById(req.params.id);
            if (!rol) {
                return res.status(404).json({
                    message: 'Rol no encontrado'
                });
            }
            res.json(rol);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener rol',
                error: error.message
            });
        }
    }
};

module.exports = rolController;