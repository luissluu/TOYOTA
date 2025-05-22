const Usuario = require('../entities/Usuario');
const bcrypt = require('bcrypt');

const usuarioController = {
    async getAll(req, res) {
        try {
            if (req.query.rol) {
                // Si es un número, buscar por rol_id
                if (!isNaN(req.query.rol)) {
                    const usuarios = await Usuario.findByRolId(Number(req.query.rol));
                    return res.json(usuarios);
                } else {
                    const usuarios = await Usuario.findByRol(req.query.rol);
                    return res.json(usuarios);
                }
            }
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener usuarios',
                error: error.message
            });
        }
    },

    async getById(req, res) {
        try {
            const usuario = await Usuario.findById(req.params.id);
            if (!usuario) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener usuario',
                error: error.message
            });
        }
    },

    // En usuarioController.js
async create(req, res) {
    try {
        // Verificar si el correo ya existe
        const usuarioExistente = await Usuario.findByEmail(req.body.correoElectronico);
        
        if (usuarioExistente) {
            return res.status(400).json({
                message: 'El correo electrónico ya está registrado'
            });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.contraseña, salt);
        
        // Crear el usuario con la contraseña encriptada
        const usuarioData = {
            ...req.body,
            contraseña: hashedPassword
        };

        const usuario = await Usuario.create(usuarioData);
        
        // No devolver la contraseña en la respuesta
        delete usuario.contraseña;
        
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario
        });
    } catch (error) {
        console.log('Error completo:', error);
        
        if (error.message.includes('El correo electrónico ya está registrado')) {
            return res.status(400).json({
                message: error.message
            });
        }
        
        res.status(500).json({
            message: 'Error al crear usuario',
            error: error.message
        });
    }
},

    async update(req, res) {
        try {
            const usuario = await Usuario.update(req.params.id, req.body);
            if (!usuario) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }
            res.json({
                message: 'Usuario actualizado exitosamente',
                usuario
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar usuario',
                error: error.message
            });
        }
    },

    async delete(req, res) {
        try {
            const result = await Usuario.delete(req.params.id);
            if (!result) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }
            res.json({
                message: 'Usuario eliminado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar usuario',
                error: error.message
            });
        }
    }
};

module.exports = usuarioController;