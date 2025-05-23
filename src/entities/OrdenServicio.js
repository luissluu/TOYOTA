const { getConnection, mssql } = require('../config/database');

class OrdenServicio {
    static async create(orden) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('cita_id', mssql.Int, orden.cita_id)
                .input('usuario_id', mssql.Int, orden.usuario_id)
                .input('vehiculo_id', mssql.Int, orden.vehiculo_id)
                .input('fecha_inicio', mssql.DateTime, orden.fecha_inicio)
                .input('estado', mssql.VarChar(30), orden.estado || 'abierta')
                .input('diagnostico', mssql.Text, orden.diagnostico)
                .input('notas', mssql.Text, orden.notas)
                .input('creado_por', mssql.Int, orden.creado_por)
                .input('total', mssql.Decimal(10, 2), orden.total || 0)
                .query(`
                    INSERT INTO Ordenes_Servicio (
                        cita_id, usuario_id, vehiculo_id, fecha_inicio,
                        estado, diagnostico, notas, creado_por, total
                    )
                    VALUES (
                        @cita_id, @usuario_id, @vehiculo_id, @fecha_inicio,
                        @estado, @diagnostico, @notas, @creado_por, @total
                    );
                    SELECT SCOPE_IDENTITY() AS orden_id;
                `);
            
            const ordenId = result.recordset[0].orden_id;
            const ordenCreada = await this.findById(ordenId);
            return ordenCreada;
            
        } catch (error) {
            if (error.message.includes('FOREIGN KEY constraint')) {
                throw new Error('El usuario, vehículo o cita especificada no existe');
            }
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .query(`
                    SELECT o.*, 
                           u.nombre as nombre_usuario, 
                           u.apellidoPaterno as apellido_usuario,
                           v.marca as marca_vehiculo,
                           v.modelo as modelo_vehiculo,
                           v.placa as placa_vehiculo,
                           v.color as color,
                           v.kilometraje as kilometraje,
                             v.año as anio,
                           c.fecha as fecha_cita
                    FROM Ordenes_Servicio o
                    INNER JOIN Usuarios u ON o.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON o.vehiculo_id = v.vehiculo_id
                    LEFT JOIN Citas c ON o.cita_id = c.cita_id
                    ORDER BY o.fecha_creacion DESC
                `);
            return result.recordset;
        } catch (error) {
            console.error('Error en findAll:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .query(`
                    SELECT o.*, 
                           u.nombre as nombre_usuario, 
                           u.apellidoPaterno as apellido_usuario,
                           v.marca as marca_vehiculo,
                           v.modelo as modelo_vehiculo,
                           v.placa as placa_vehiculo,
                           v.color as color,
                           v.kilometraje as kilometraje,
                             v.año as anio,
                           c.fecha as fecha_cita
                    FROM Ordenes_Servicio o
                    INNER JOIN Usuarios u ON o.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON o.vehiculo_id = v.vehiculo_id
                    LEFT JOIN Citas c ON o.cita_id = c.cita_id
                    WHERE o.orden_id = @id
                `);
            return result.recordset[0];
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
                    SELECT o.*, 
                           u.nombre as nombre_usuario, 
                           u.apellidoPaterno as apellido_usuario,
                           v.marca as marca_vehiculo,
                           v.modelo as modelo_vehiculo,
                           v.placa as placa_vehiculo,
                           v.color as color,
                           v.kilometraje as kilometraje,
                             v.año as anio,
                           c.fecha as fecha_cita
                    FROM Ordenes_Servicio o
                    INNER JOIN Usuarios u ON o.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON o.vehiculo_id = v.vehiculo_id
                    LEFT JOIN Citas c ON o.cita_id = c.cita_id
                    WHERE o.usuario_id = @usuario_id
                    ORDER BY o.fecha_creacion DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findByVehiculo(vehiculoId) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('vehiculo_id', mssql.Int, vehiculoId)
                .query(`
                    SELECT o.*, 
                           u.nombre as nombre_usuario, 
                           u.apellidoPaterno as apellido_usuario,
                           v.marca as marca_vehiculo,
                           v.modelo as modelo_vehiculo,
                           v.placa as placa_vehiculo,
                           v.color as color,
                           v.kilometraje as kilometraje,
                            v.año as anio,
                           c.fecha as fecha_cita
                    FROM Ordenes_Servicio o
                    INNER JOIN Usuarios u ON o.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON o.vehiculo_id = v.vehiculo_id
                    LEFT JOIN Citas c ON o.cita_id = c.cita_id
                    WHERE o.vehiculo_id = @vehiculo_id
                    ORDER BY o.fecha_creacion DESC
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
                .input('estado', mssql.VarChar(30), estado)
                .query(`
                    SELECT o.*, 
                           u.nombre as nombre_usuario, 
                           u.apellidoPaterno as apellido_usuario,
                           v.marca as marca_vehiculo,
                           v.modelo as modelo_vehiculo,
                           v.placa as placa_vehiculo,
                           v.color as color,
                           v.kilometraje as kilometraje,
                             v.año as anio,
                           c.fecha as fecha_cita
                    FROM Ordenes_Servicio o
                    INNER JOIN Usuarios u ON o.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON o.vehiculo_id = v.vehiculo_id
                    LEFT JOIN Citas c ON o.cita_id = c.cita_id
                    WHERE o.estado = @estado
                    ORDER BY o.fecha_creacion DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, orden) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('fecha_inicio', mssql.DateTime, orden.fecha_inicio)
                .input('fecha_finalizacion', mssql.DateTime, orden.fecha_finalizacion)
                .input('estado', mssql.VarChar(30), orden.estado)
                .input('diagnostico', mssql.Text, orden.diagnostico)
                .input('notas', mssql.Text, orden.notas)
                .input('total', mssql.Decimal(10, 2), orden.total)
                .query(`
                    UPDATE Ordenes_Servicio
                    SET fecha_inicio = @fecha_inicio,
                        fecha_finalizacion = @fecha_finalizacion,
                        estado = @estado,
                        diagnostico = @diagnostico,
                        notas = @notas,
                        total = @total
                    OUTPUT INSERTED.*
                    WHERE orden_id = @id
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
                .input('estado', mssql.VarChar(30), estado)
                .query(`
                    UPDATE Ordenes_Servicio
                    SET estado = @estado
                    OUTPUT INSERTED.*
                    WHERE orden_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateTotal(id, total) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('total', mssql.Decimal(10, 2), total)
                .query(`
                    UPDATE Ordenes_Servicio
                    SET total = @total
                    OUTPUT INSERTED.*
                    WHERE orden_id = @id
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
                .query('DELETE FROM Ordenes_Servicio WHERE orden_id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrdenServicio; 