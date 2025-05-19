const { getConnection, mssql } = require('../config/database');

class Pedido {
    static async create(pedido) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('proveedor_id', mssql.Int, pedido.proveedor_id)
                .input('fecha_entrega_esperada', mssql.Date, pedido.fecha_entrega_esperada)
                .input('usuario_id', mssql.Int, pedido.usuario_id)
                .query(`
                    INSERT INTO Pedidos (
                        proveedor_id, fecha_entrega_esperada, usuario_id
                    )
                    VALUES (
                        @proveedor_id, @fecha_entrega_esperada, @usuario_id
                    );
                    SELECT SCOPE_IDENTITY() AS pedido_id;
                `);
            
            const pedidoId = result.recordset[0].pedido_id;
            const pedidoCreado = await this.findById(pedidoId);
            return pedidoCreado;
            
        } catch (error) {
            if (error.message.includes('FOREIGN KEY constraint')) {
                throw new Error('El proveedor o usuario especificado no existe');
            }
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request().query(`
                SELECT p.*, 
                       pr.nombre as nombre_proveedor,
                       u.nombre as nombre_usuario,
                       u.apellidoPaterno as apellido_usuario
                FROM Pedidos p
                INNER JOIN Proveedores pr ON p.proveedor_id = pr.proveedor_id
                INNER JOIN Usuarios u ON p.usuario_id = u.usuario_id
                ORDER BY p.fecha_pedido DESC
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
                    SELECT p.*, 
                           pr.nombre as nombre_proveedor,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario
                    FROM Pedidos p
                    INNER JOIN Proveedores pr ON p.proveedor_id = pr.proveedor_id
                    INNER JOIN Usuarios u ON p.usuario_id = u.usuario_id
                    WHERE p.pedido_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByProveedor(proveedorId) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('proveedor_id', mssql.Int, proveedorId)
                .query(`
                    SELECT p.*, 
                           pr.nombre as nombre_proveedor,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario
                    FROM Pedidos p
                    INNER JOIN Proveedores pr ON p.proveedor_id = pr.proveedor_id
                    INNER JOIN Usuarios u ON p.usuario_id = u.usuario_id
                    WHERE p.proveedor_id = @proveedor_id
                    ORDER BY p.fecha_pedido DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findByUsuario(usuarioId) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('usuario_id', mssql.Int, usuarioId)
                .query(`
                    SELECT p.*, 
                           pr.nombre as nombre_proveedor,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario
                    FROM Pedidos p
                    INNER JOIN Proveedores pr ON p.proveedor_id = pr.proveedor_id
                    INNER JOIN Usuarios u ON p.usuario_id = u.usuario_id
                    WHERE p.usuario_id = @usuario_id
                    ORDER BY p.fecha_pedido DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, pedido) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('fecha_entrega_esperada', mssql.Date, pedido.fecha_entrega_esperada)
                .input('fecha_recepcion', mssql.DateTime, pedido.fecha_recepcion)
                .input('total', mssql.Decimal(10, 2), pedido.total)
                .query(`
                    UPDATE Pedidos
                    SET fecha_entrega_esperada = @fecha_entrega_esperada,
                        fecha_recepcion = @fecha_recepcion,
                        total = @total
                    OUTPUT INSERTED.*
                    WHERE pedido_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateTotal(id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .query(`
                    UPDATE p
                    SET total = (
                        SELECT SUM(dp.cantidad_pedida * dp.precio_unitario)
                        FROM Detalles_Pedido dp
                        WHERE dp.pedido_id = p.pedido_id
                    )
                    OUTPUT INSERTED.*
                    FROM Pedidos p
                    WHERE p.pedido_id = @id
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
                .query('DELETE FROM Pedidos WHERE pedido_id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Pedido; 