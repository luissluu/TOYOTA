const Pedido = require('../entities/pedido');

const pedidoController = {
    async create(req, res) {
        try {
            // Añadir el ID del usuario que crea el pedido
            const pedidoData = {
                ...req.body,
                usuario_id: req.usuario?.id || req.body.usuario_id
            };
            
            const pedido = await Pedido.create(pedidoData);
            res.status(201).json({
                message: 'Pedido creado exitosamente',
                pedido
            });
        } catch (error) {
            console.error('Error al crear pedido:', error);
            res.status(500).json({
                message: 'Error al crear pedido',
                error: error.message
            });
        }
    },

    async getAll(req, res) {
        try {
            const pedidos = await Pedido.findAll();
            res.json(pedidos);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener pedidos',
                error: error.message
            });
        }
    },

    async getById(req, res) {
        try {
            const pedido = await Pedido.findById(req.params.id);
            if (!pedido) {
                return res.status(404).json({
                    message: 'Pedido no encontrado'
                });
            }
            res.json(pedido);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener pedido',
                error: error.message
            });
        }
    },

    async update(req, res) {
        try {
            const pedido = await Pedido.update(req.params.id, req.body);
            if (!pedido) {
                return res.status(404).json({
                    message: 'Pedido no encontrado'
                });
            }
            res.json({
                message: 'Pedido actualizado exitosamente',
                pedido
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar pedido',
                error: error.message
            });
        }
    },

    async recibirPedido(req, res) {
        try {
            // Añadir el ID del usuario que recibe el pedido
            const datos = {
                ...req.body,
                usuario_id: req.usuario?.id || req.body.usuario_id
            };
            const pedido = await Pedido.recibirPedido(req.params.id, datos);
           if (!pedido) {
               return res.status(404).json({
                   message: 'Pedido no encontrado'
               });
           }
           res.json({
               message: 'Pedido recibido exitosamente',
               pedido
           });
       } catch (error) {
           res.status(500).json({
               message: 'Error al recibir pedido',
               error: error.message
           });
       }
   },

   async delete(req, res) {
    try {
        const result = await Pedido.delete(req.params.id);
        if (!result) {
            return res.status(404).json({
                message: 'Pedido no encontrado'
            });
        }
        res.json({
            message: 'Pedido eliminado exitosamente'
        });
    } catch (error) {
        let status = 500;
        let message = 'Error al eliminar pedido';
        
        if (error.message.includes('No se puede eliminar un pedido que ya ha sido recibido')) {
            status = 400;
            message = error.message;
        }
        
        res.status(status).json({
            message,
            error: error.message
        });
    }
},

async addDetalle(req, res) {
    try {
        const detalle = await Pedido.addDetalle(req.params.id, req.body);
        res.status(201).json({
            message: 'Detalle agregado exitosamente al pedido',
            detalle
        });
    } catch (error) {
        let status = 500;
        let message = 'Error al agregar detalle al pedido';
        
        if (error.message.includes('Pedido no encontrado') || error.message.includes('No se puede añadir detalles')) {
            status = 400;
            message = error.message;
        }
        
        res.status(status).json({
            message,
            error: error.message
        });
    }
},

async updateDetalle(req, res) {
    try {
        const detalle = await Pedido.updateDetalle(req.params.detalleId, req.body);
        if (!detalle) {
            return res.status(404).json({
                message: 'Detalle de pedido no encontrado'
            });
        }
        res.json({
            message: 'Detalle de pedido actualizado exitosamente',
            detalle
        });
    } catch (error) {
        let status = 500;
        let message = 'Error al actualizar detalle de pedido';
        
        if (error.message.includes('No se puede modificar un detalle')) {
            status = 400;
            message = error.message;
        }
        
        res.status(status).json({
            message,
            error: error.message
        });
    }
},

async deleteDetalle(req, res) {
    try {
        const result = await Pedido.deleteDetalle(req.params.detalleId);
        if (!result) {
            return res.status(404).json({
                message: 'Detalle de pedido no encontrado'
            });
        }
        res.json({
            message: 'Detalle de pedido eliminado exitosamente'
        });
    } catch (error) {
        let status = 500;
        let message = 'Error al eliminar detalle de pedido';
        
        if (error.message.includes('No se puede eliminar un detalle')) {
            status = 400;
            message = error.message;
        }
        
        res.status(status).json({
            message,
            error: error.message
        });
    }
}
};

module.exports = pedidoController;