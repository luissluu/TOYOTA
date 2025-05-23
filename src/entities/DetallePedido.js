const { getConnection, mssql } = require('../config/database');

class DetallePedido {
    static async create(detalle) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('pedido_id', mssql.Int, detalle.pedido_id)
                .input('articulo_id', mssql.Int, detalle.articulo_id)
                .input('cantidad_pedida', mssql.Int, detalle.cantidad_pedida)
                .input('cantidad_recibida', mssql.Int, detalle.cantidad_recibida || 0)
                .input('precio_unitario', mssql.Decimal(10, 2), detalle.precio_unitario)
                .input('estado', mssql.VarChar(20), detalle.estado || 'pendiente')
                .query(`
                    INSERT INTO Detalles_Pedido (
                        pedido_id, articulo_id, cantidad_pedida,
                        cantidad_recibida, precio_unitario, estado
                    )
                    VALUES (
                        @pedido_id, @articulo_id, @cantidad_pedida,
                        @cantidad_recibida, @precio_unitario, @estado
                    );
                    SELECT SCOPE_IDENTITY() AS detalle_pedido_id;
                `);
            
            const detalleId = result.recordset[0].detalle_pedido_id;
            const detalleCreado = await this.findById(detalleId);
            return detalleCreado;
            
        } catch (error) {
            if (error.message.includes('FOREIGN KEY constraint')) {
                throw new Error('El pedido o artículo especificado no existe');
            }
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request().query(`
                SELECT dp.*, 
                       i.nombre as nombre_articulo,
                       i.codigo as codigo_articulo
                FROM Detalles_Pedido dp
                INNER JOIN Inventario i ON dp.articulo_id = i.articulo_id
                ORDER BY dp.detalle_pedido_id DESC
            `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .query(`
                    SELECT dp.*, 
                           i.nombre as nombre_articulo,
                           i.codigo as codigo_articulo
                    FROM Detalles_Pedido dp
                    INNER JOIN Inventario i ON dp.articulo_id = i.articulo_id
                    WHERE dp.detalle_pedido_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByPedido(pedidoId) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('pedido_id', mssql.Int, pedidoId)
                .query(`
                    SELECT dp.*, 
                           i.nombre as nombre_articulo,
                           i.codigo as codigo_articulo
                    FROM Detalles_Pedido dp
                    INNER JOIN Inventario i ON dp.articulo_id = i.articulo_id
                    WHERE dp.pedido_id = @pedido_id
                    ORDER BY dp.detalle_pedido_id DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findByArticulo(articuloId) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('articulo_id', mssql.Int, articuloId)
                .query(`
                    SELECT dp.*, 
                           i.nombre as nombre_articulo,
                           i.codigo as codigo_articulo
                    FROM Detalles_Pedido dp
                    INNER JOIN Inventario i ON dp.articulo_id = i.articulo_id
                    WHERE dp.articulo_id = @articulo_id
                    ORDER BY dp.detalle_pedido_id DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findByEstado(estado) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('estado', mssql.VarChar(20), estado)
                .query(`
                    SELECT dp.*, 
                           i.nombre as nombre_articulo,
                           i.codigo as codigo_articulo
                    FROM Detalles_Pedido dp
                    INNER JOIN Inventario i ON dp.articulo_id = i.articulo_id
                    WHERE dp.estado = @estado
                    ORDER BY dp.detalle_pedido_id DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, detalle) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('cantidad_pedida', mssql.Int, detalle.cantidad_pedida)
                .input('cantidad_recibida', mssql.Int, detalle.cantidad_recibida)
                .input('precio_unitario', mssql.Decimal(10, 2), detalle.precio_unitario)
                .input('estado', mssql.VarChar(20), detalle.estado)
                .query(`
                    UPDATE Detalles_Pedido
                    SET cantidad_pedida = @cantidad_pedida,
                        cantidad_recibida = @cantidad_recibida,
                        precio_unitario = @precio_unitario,
                        estado = @estado
                    OUTPUT INSERTED.*
                    WHERE detalle_pedido_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateEstado(id, estado) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('estado', mssql.VarChar(20), estado)
                .query(`
                    UPDATE Detalles_Pedido
                    SET estado = @estado
                    OUTPUT INSERTED.*
                    WHERE detalle_pedido_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateCantidadRecibida(id, cantidad) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('cantidad', mssql.Int, cantidad)
                .query(`
                    UPDATE Detalles_Pedido
                    SET cantidad_recibida = @cantidad,
                        estado = CASE 
                            WHEN @cantidad >= cantidad_pedida THEN 'completado'
                            WHEN @cantidad > 0 THEN 'parcial'
                            ELSE estado
                        END
                    OUTPUT INSERTED.*
                    WHERE detalle_pedido_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .query('DELETE FROM Detalles_Pedido WHERE detalle_pedido_id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DetallePedido; 