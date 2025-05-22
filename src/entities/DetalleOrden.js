const { getConnection, mssql } = require('../config/database');

class DetalleOrden {
    static async create(detalle) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('orden_id', mssql.Int, detalle.orden_id)
                .input('servicio_id', mssql.Int, detalle.servicio_id)
                .input('descripcion', mssql.Text, detalle.descripcion)
                .input('precio', mssql.Decimal(10, 2), detalle.precio)
                .input('mecanico_id', mssql.Int, detalle.mecanico_id)
                .input('estado', mssql.VarChar(20), detalle.estado || 'pendiente')
                .input('horas_trabajo', mssql.Decimal(5, 2), detalle.horas_trabajo)
                .query(`
                    INSERT INTO Detalles_Orden (
                        orden_id, servicio_id, descripcion, precio,
                        mecanico_id, estado, horas_trabajo
                    )
                    VALUES (
                        @orden_id, @servicio_id, @descripcion, @precio,
                        @mecanico_id, @estado, @horas_trabajo
                    );
                    SELECT SCOPE_IDENTITY() AS detalle_id;
                `);
            
            const detalleId = result.recordset[0].detalle_id;
            const detalleCreado = await this.findById(detalleId);
            return detalleCreado;
            
        } catch (error) {
            if (error.message.includes('FOREIGN KEY constraint')) {
                throw new Error('La orden, servicio o mecánico especificado no existe');
            }
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request().query(`
                SELECT d.*, 
                       s.nombre as nombre_servicio,
                       s.descripcion as descripcion_servicio,
                       m.nombre as nombre_mecanico,
                       m.apellidoPaterno as apellido_mecanico
                FROM Detalles_Orden d
                INNER JOIN Servicios s ON d.servicio_id = s.servicio_id
                LEFT JOIN Usuarios m ON d.mecanico_id = m.usuario_id
                ORDER BY d.detalle_id DESC
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
                    SELECT d.*, 
                           s.nombre as nombre_servicio,
                           s.descripcion as descripcion_servicio,
                           m.nombre as nombre_mecanico,
                           m.apellidoPaterno as apellido_mecanico
                    FROM Detalles_Orden d
                    INNER JOIN Servicios s ON d.servicio_id = s.servicio_id
                    LEFT JOIN Usuarios m ON d.mecanico_id = m.usuario_id
                    WHERE d.detalle_id = @id
                `);
            return result.recordset[0];
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
                    SELECT d.*, 
                           s.nombre as nombre_servicio,
                           s.descripcion as descripcion_servicio,
                           m.nombre as nombre_mecanico,
                           m.apellidoPaterno as apellido_mecanico
                    FROM Detalles_Orden d
                    INNER JOIN Servicios s ON d.servicio_id = s.servicio_id
                    LEFT JOIN Usuarios m ON d.mecanico_id = m.usuario_id
                    WHERE d.orden_id = @orden_id
                    ORDER BY d.detalle_id DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findByMecanico(mecanicoId) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('mecanico_id', mssql.Int, mecanicoId)
                .query(`
                    SELECT d.*, 
                           s.nombre as nombre_servicio,
                           s.descripcion as descripcion_servicio,
                           m.nombre as nombre_mecanico,
                           m.apellidoPaterno as apellido_mecanico
                    FROM Detalles_Orden d
                    INNER JOIN Servicios s ON d.servicio_id = s.servicio_id
                    LEFT JOIN Usuarios m ON d.mecanico_id = m.usuario_id
                    WHERE d.mecanico_id = @mecanico_id
                    ORDER BY d.detalle_id DESC
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
                    SELECT d.*, 
                           s.nombre as nombre_servicio,
                           s.descripcion as descripcion_servicio,
                           m.nombre as nombre_mecanico,
                           m.apellidoPaterno as apellido_mecanico
                    FROM Detalles_Orden d
                    INNER JOIN Servicios s ON d.servicio_id = s.servicio_id
                    LEFT JOIN Usuarios m ON d.mecanico_id = m.usuario_id
                    WHERE d.estado = @estado
                    ORDER BY d.detalle_id DESC
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
                .input('descripcion', mssql.Text, detalle.descripcion)
                .input('precio', mssql.Decimal(10, 2), detalle.precio)
                .input('mecanico_id', mssql.Int, detalle.mecanico_id)
                .input('estado', mssql.VarChar(20), detalle.estado)
                .input('horas_trabajo', mssql.Decimal(5, 2), detalle.horas_trabajo)
                .query(`
                    UPDATE Detalles_Orden
                    SET descripcion = @descripcion,
                        precio = @precio,
                        mecanico_id = @mecanico_id,
                        estado = @estado,
                        horas_trabajo = @horas_trabajo
                    OUTPUT INSERTED.*
                    WHERE detalle_id = @id
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
                    UPDATE Detalles_Orden
                    SET estado = @estado
                    OUTPUT INSERTED.*
                    WHERE detalle_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateMecanico(id, mecanicoId) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('mecanico_id', mssql.Int, mecanicoId)
                .query(`
                    UPDATE Detalles_Orden
                    SET mecanico_id = @mecanico_id
                    OUTPUT INSERTED.*
                    WHERE detalle_id = @id
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
                .query('DELETE FROM Detalles_Orden WHERE detalle_id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DetalleOrden; 