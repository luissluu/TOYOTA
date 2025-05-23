const { getConnection, mssql } = require('../config/database');

class MovimientoInventario {
    static async create(movimiento) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('articulo_id', mssql.Int, movimiento.articulo_id)
                .input('tipo_movimiento', mssql.VarChar(20), movimiento.tipo_movimiento)
                .input('cantidad', mssql.Int, movimiento.cantidad)
                .input('orden_id', mssql.Int, movimiento.orden_id || null)
                .input('proveedor_id', mssql.Int, movimiento.proveedor_id || null)
                .input('precio_unitario', mssql.Decimal(10, 2), movimiento.precio_unitario || 0)
                .input('usuario_id', mssql.Int, movimiento.usuario_id)
                .input('motivo', mssql.VarChar(255), movimiento.motivo || '')
                .input('numero_factura', mssql.VarChar(50), movimiento.numero_factura || '')
                .input('notas', mssql.Text, movimiento.notas || '')
                .query(`
                    INSERT INTO Movimientos_Inventario (
                        articulo_id, tipo_movimiento, cantidad, orden_id,
                        proveedor_id, precio_unitario, usuario_id, motivo,
                        numero_factura, notas
                    )
                    VALUES (
                        @articulo_id, @tipo_movimiento, @cantidad, @orden_id,
                        @proveedor_id, @precio_unitario, @usuario_id, @motivo,
                        @numero_factura, @notas
                    );
                    SELECT SCOPE_IDENTITY() AS movimiento_id;
                `);
    
            const movimientoId = result.recordset[0].movimiento_id;
            const movimientoCreado = await this.findById(movimientoId);
            return movimientoCreado;
        } catch (error) {
            if (error.message.includes('FOREIGN KEY constraint')) {
                throw new Error('El artículo, orden, proveedor o usuario especificado no existe');
            }
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request().query(`
                SELECT m.*, 
                       i.nombre as nombre_articulo,
                       i.codigo as codigo_articulo,
                       u.nombre as nombre_usuario,
                       u.apellidoPaterno as apellido_usuario,
                       p.nombre as nombre_proveedor
                FROM Movimientos_Inventario m
                INNER JOIN Inventario i ON m.articulo_id = i.articulo_id
                INNER JOIN Usuarios u ON m.usuario_id = u.usuario_id
                LEFT JOIN Proveedores p ON m.proveedor_id = p.proveedor_id
                LEFT JOIN Ordenes_Servicio o ON m.orden_id = o.orden_id
                ORDER BY m.fecha_movimiento DESC
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
                    SELECT m.*, 
                           i.nombre as nombre_articulo,
                           i.codigo as codigo_articulo,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario,
                           p.nombre as nombre_proveedor
                    FROM Movimientos_Inventario m
                    INNER JOIN Inventario i ON m.articulo_id = i.articulo_id
                    INNER JOIN Usuarios u ON m.usuario_id = u.usuario_id
                    LEFT JOIN Proveedores p ON m.proveedor_id = p.proveedor_id
                    LEFT JOIN Ordenes_Servicio o ON m.orden_id = o.orden_id
                    WHERE m.movimiento_id = @id
                `);
            return result.recordset[0];
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
                    SELECT m.*, 
                           i.nombre as nombre_articulo,
                           i.codigo as codigo_articulo,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario,
                           p.nombre as nombre_proveedor
                    FROM Movimientos_Inventario m
                    INNER JOIN Inventario i ON m.articulo_id = i.articulo_id
                    INNER JOIN Usuarios u ON m.usuario_id = u.usuario_id
                    LEFT JOIN Proveedores p ON m.proveedor_id = p.proveedor_id
                    LEFT JOIN Ordenes_Servicio o ON m.orden_id = o.orden_id
                    WHERE m.articulo_id = @articulo_id
                    ORDER BY m.fecha_movimiento DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findByTipoMovimiento(tipo) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('tipo', mssql.VarChar(20), tipo)
                .query(`
                    SELECT m.*, 
                           i.nombre as nombre_articulo,
                           i.codigo as codigo_articulo,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario,
                           p.nombre as nombre_proveedor
                    FROM Movimientos_Inventario m
                    INNER JOIN Inventario i ON m.articulo_id = i.articulo_id
                    INNER JOIN Usuarios u ON m.usuario_id = u.usuario_id
                    LEFT JOIN Proveedores p ON m.proveedor_id = p.proveedor_id
                    LEFT JOIN Ordenes_Servicio o ON m.orden_id = o.orden_id
                    WHERE m.tipo_movimiento = @tipo
                    ORDER BY m.fecha_movimiento DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findByOrden(ordenId) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('orden_id', mssql.Int, ordenId)
                .query(`
                    SELECT m.*, 
                           i.nombre as nombre_articulo,
                           i.codigo as codigo_articulo,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario,
                           p.nombre as nombre_proveedor
                    FROM Movimientos_Inventario m
                    INNER JOIN Inventario i ON m.articulo_id = i.articulo_id
                    INNER JOIN Usuarios u ON m.usuario_id = u.usuario_id
                    LEFT JOIN Proveedores p ON m.proveedor_id = p.proveedor_id
                    LEFT JOIN Ordenes_Servicio o ON m.orden_id = o.orden_id
                    WHERE m.orden_id = @orden_id
                    ORDER BY m.fecha_movimiento DESC
                `);
            return result.recordset;
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
                    SELECT m.*, 
                           i.nombre as nombre_articulo,
                           i.codigo as codigo_articulo,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario,
                           p.nombre as nombre_proveedor
                    FROM Movimientos_Inventario m
                    INNER JOIN Inventario i ON m.articulo_id = i.articulo_id
                    INNER JOIN Usuarios u ON m.usuario_id = u.usuario_id
                    LEFT JOIN Proveedores p ON m.proveedor_id = p.proveedor_id
                    LEFT JOIN Ordenes_Servicio o ON m.orden_id = o.orden_id
                    WHERE m.proveedor_id = @proveedor_id
                    ORDER BY m.fecha_movimiento DESC
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
                    SELECT m.*, 
                           i.nombre as nombre_articulo,
                           i.codigo as codigo_articulo,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario,
                           p.nombre as nombre_proveedor
                    FROM Movimientos_Inventario m
                    INNER JOIN Inventario i ON m.articulo_id = i.articulo_id
                    INNER JOIN Usuarios u ON m.usuario_id = u.usuario_id
                    LEFT JOIN Proveedores p ON m.proveedor_id = p.proveedor_id
                    LEFT JOIN Ordenes_Servicio o ON m.orden_id = o.orden_id
                    WHERE m.usuario_id = @usuario_id
                    ORDER BY m.fecha_movimiento DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findByFecha(fechaInicio, fechaFin) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('fecha_inicio', mssql.DateTime, fechaInicio)
                .input('fecha_fin', mssql.DateTime, fechaFin)
                .query(`
                    SELECT m.*, 
                           i.nombre as nombre_articulo,
                           i.codigo as codigo_articulo,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario,
                           p.nombre as nombre_proveedor
                    FROM Movimientos_Inventario m
                    INNER JOIN Inventario i ON m.articulo_id = i.articulo_id
                    INNER JOIN Usuarios u ON m.usuario_id = u.usuario_id
                    LEFT JOIN Proveedores p ON m.proveedor_id = p.proveedor_id
                    LEFT JOIN Ordenes_Servicio o ON m.orden_id = o.orden_id
                    WHERE m.fecha_movimiento BETWEEN @fecha_inicio AND @fecha_fin
                    ORDER BY m.fecha_movimiento DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, movimiento) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('motivo', mssql.VarChar(255), movimiento.motivo)
                .input('numero_factura', mssql.VarChar(50), movimiento.numero_factura)
                .input('notas', mssql.Text, movimiento.notas)
                .query(`
                    UPDATE Movimientos_Inventario
                    SET motivo = @motivo,
                        numero_factura = @numero_factura,
                        notas = @notas
                    OUTPUT INSERTED.*
                    WHERE movimiento_id = @id
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
                .query('DELETE FROM Movimientos_Inventario WHERE movimiento_id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MovimientoInventario; 