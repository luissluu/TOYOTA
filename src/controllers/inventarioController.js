const Inventario = require('../entities/inventario');

const inventarioController = {
    async create(req, res) {
        try {
            // Verificar si el código ya existe
            if (req.body.codigo) {
                const articuloExistente = await Inventario.findByCodigo(req.body.codigo);
                if (articuloExistente) {
                    return res.status(400).json({
                        message: 'Ya existe un artículo con ese código'
                    });
                }
            }

            const articulo = await Inventario.create(req.body);
            res.status(201).json({
                message: 'Artículo creado exitosamente',
                articulo
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear artículo',
                error: error.message
            });
        }
    },

    async getAll(req, res) {
        try {
            const articulos = await Inventario.findAll();
            res.json(articulos);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener artículos',
                error: error.message
            });
        }
    },

    async getById(req, res) {
        try {
            const articulo = await Inventario.findById(req.params.id);
            if (!articulo) {
                return res.status(404).json({
                    message: 'Artículo no encontrado'
                });
            }
            res.json(articulo);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener artículo',
                error: error.message
            });
        }
    },

    async search(req, res) {
        try {
            const articulos = await Inventario.search(req.query.q);
            res.json(articulos);
        } catch (error) {
            res.status(500).json({
                message: 'Error al buscar artículos',
                error: error.message
            });
        }
    },

    async getByCategoria(req, res) {
        try {
            const articulos = await Inventario.findByCategoria(req.params.categoria);
            res.json(articulos);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener artículos por categoría',
                error: error.message
            });
        }
    },

    async update(req, res) {
        try {
            // Verificar si el código ya existe (si se está actualizando)
            if (req.body.codigo) {
                const articuloExistente = await Inventario.findByCodigo(req.body.codigo);
                if (articuloExistente && articuloExistente.articulo_id !== parseInt(req.params.id)) {
                    return res.status(400).json({
                        message: 'Ya existe un artículo con ese código'
                    });
                }
            }

            const articulo = await Inventario.update(req.params.id, req.body);
            if (!articulo) {
                return res.status(404).json({
                    message: 'Artículo no encontrado'
                });
            }
            res.json({
                message: 'Artículo actualizado exitosamente',
                articulo
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar artículo',
                error: error.message
            });
        }
    },

    async updateStock(req, res) {
        try {
            const { cantidad, tipo_movimiento, motivo } = req.body;
            
            // Validar cantidad
            if (!cantidad || cantidad <= 0) {
                return res.status(400).json({
                    message: 'La cantidad debe ser mayor a cero'
                });
            }
            
            // Validar tipo de movimiento
            if (!['entrada', 'salida'].includes(tipo_movimiento)) {
                return res.status(400).json({
                    message: 'Tipo de movimiento inválido. Debe ser "entrada" o "salida"'
                });
            }
            
            // Obtener ID del usuario desde el token JWT o el cuerpo de la solicitud
            const usuario_id = req.user?.id || req.body.usuario_id;
            if (!usuario_id) {
                return res.status(400).json({
                    message: 'Se requiere ID de usuario'
                });
            }
            
            const articulo = await Inventario.updateStock(
                req.params.id, 
                cantidad, 
                tipo_movimiento, 
                usuario_id, 
                motivo
            );
            
            res.json({
                message: `Stock ${tipo_movimiento === 'entrada' ? 'aumentado' : 'reducido'} exitosamente`,
                articulo
            });
        } catch (error) {
            let status = 500;
            let message = 'Error al actualizar stock';
            
            if (error.message === 'Stock insuficiente') {
                status = 400;
                message = 'Stock insuficiente para realizar la salida';
            } else if (error.message === 'Artículo no encontrado') {
                status = 404;
                message = 'Artículo no encontrado';
            } else if (error.message === 'Tipo de movimiento inválido') {
                status = 400;
                message = 'Tipo de movimiento inválido. Debe ser "entrada" o "salida"';
            }
            
            res.status(status).json({
                message,
                error: error.message
            });
        }
    },

    async delete(req, res) {
        try {
            const result = await Inventario.delete(req.params.id);
            if (!result) {
                return res.status(404).json({
                    message: 'Artículo no encontrado'
                });
            }
            res.json({
                message: 'Artículo eliminado exitosamente'
            });
        } catch (error) {
            let status = 500;
            let message = 'Error al eliminar artículo';
            
            if (error.message.includes('No se puede eliminar un artículo con movimientos')) {
                status = 400;
                message = error.message;
            }
            
            res.status(status).json({
                message,
                error: error.message
            });
        }
    },

    async getMovimientos(req, res) {
        try {
            const movimientos = await Inventario.getMovimientos(req.params.id);
            res.json(movimientos);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener movimientos del artículo',
                error: error.message
            });
        }
    },

    async getAllMovimientos(req, res) {
        try {
            const movimientos = await Inventario.getAllMovimientos();
            res.json(movimientos);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener movimientos de inventario',
                error: error.message
            });
        }
    },

    async getBajoStock(req, res) {
        try {
            const articulos = await Inventario.getBajoStock();
            res.json(articulos);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener artículos con bajo stock',
                error: error.message
            });
        }
    }
};

module.exports = inventarioController;