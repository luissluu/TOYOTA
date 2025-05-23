const { getConnection, mssql } = require('../config/database');

class Cita {
    static async create(cita) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('usuario_id', mssql.Int, cita.usuario_id)
                .input('vehiculo_id', mssql.Int, cita.vehiculo_id)
                .input('fecha', mssql.Date, cita.fecha)
                .input('tipo_servicio', mssql.VarChar(100), cita.tipo_servicio)
                .input('descripcion', mssql.Text, cita.descripcion)
                .query(`
                    INSERT INTO Citas (
                        usuario_id, vehiculo_id, fecha, tipo_servicio, descripcion
                    )
                    VALUES (
                        @usuario_id, @vehiculo_id, @fecha, @tipo_servicio, @descripcion
                    );
                    SELECT SCOPE_IDENTITY() AS cita_id;
                `);
            
            const citaId = result.recordset[0].cita_id;
            const citaCreada = await this.findById(citaId);
            return citaCreada;
            
        } catch (error) {
            if (error.message.includes('FOREIGN KEY constraint')) {
                throw new Error('El usuario o vehículo especificado no existe');
            }
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request().query(`
                SELECT c.*, 
                       u.nombre as nombre_usuario, 
                       u.apellidoPaterno as apellido_usuario,
                       v.marca as marca_vehiculo,
                       v.modelo as modelo_vehiculo,
                       v.placa as placa_vehiculo
                FROM Citas c
                INNER JOIN Usuarios u ON c.usuario_id = u.usuario_id
                INNER JOIN Vehiculos v ON c.vehiculo_id = v.vehiculo_id
                ORDER BY c.fecha DESC
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
                    SELECT c.*, 
                           u.nombre as nombre_usuario, 
                           u.apellidoPaterno as apellido_usuario,
                           v.marca as marca_vehiculo,
                           v.modelo as modelo_vehiculo,
                           v.placa as placa_vehiculo
                    FROM Citas c
                    INNER JOIN Usuarios u ON c.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON c.vehiculo_id = v.vehiculo_id
                    WHERE c.cita_id = @id
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
                    SELECT c.cita_id, c.usuario_id, c.vehiculo_id, c.fecha, c.tipo_servicio, c.descripcion,
                           u.nombre as nombre_usuario, 
                           u.apellidoPaterno as apellido_usuario,
                           v.marca as marca_vehiculo,
                           v.modelo as modelo_vehiculo,
                           v.placa as placa_vehiculo
                    FROM Citas c
                    INNER JOIN Usuarios u ON c.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON c.vehiculo_id = v.vehiculo_id
                    WHERE c.usuario_id = @usuario_id
                    ORDER BY c.fecha DESC
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
                    SELECT c.*, 
                           u.nombre as nombre_usuario, 
                           u.apellidoPaterno as apellido_usuario,
                           v.marca as marca_vehiculo,
                           v.modelo as modelo_vehiculo,
                           v.placa as placa_vehiculo
                    FROM Citas c
                    INNER JOIN Usuarios u ON c.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON c.vehiculo_id = v.vehiculo_id
                    WHERE c.vehiculo_id = @vehiculo_id
                    ORDER BY c.fecha DESC, c.hora_inicio ASC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findByFecha(fecha) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('fecha', mssql.Date, fecha)
                .query(`
                    SELECT c.*, 
                           u.nombre as nombre_usuario, 
                           u.apellidoPaterno as apellido_usuario,
                           v.marca as marca_vehiculo,
                           v.modelo as modelo_vehiculo,
                           v.placa as placa_vehiculo
                    FROM Citas c
                    INNER JOIN Usuarios u ON c.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON c.vehiculo_id = v.vehiculo_id
                    WHERE c.fecha = @fecha
                    ORDER BY c.hora_inicio ASC
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
                    SELECT c.*, 
                           u.nombre as nombre_usuario, 
                           u.apellidoPaterno as apellido_usuario,
                           v.marca as marca_vehiculo,
                           v.modelo as modelo_vehiculo,
                           v.placa as placa_vehiculo
                    FROM Citas c
                    INNER JOIN Usuarios u ON c.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON c.vehiculo_id = v.vehiculo_id
                    WHERE c.estado = @estado
                    ORDER BY c.fecha DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, cita) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('fecha', mssql.Date, cita.fecha)
                .input('tipo_servicio', mssql.VarChar(100), cita.tipo_servicio)
                .input('descripcion', mssql.Text, cita.descripcion)
                .query(`
                    UPDATE Citas
                    SET fecha = @fecha,
                        tipo_servicio = @tipo_servicio,
                        descripcion = @descripcion
                    OUTPUT INSERTED.*
                    WHERE cita_id = @id
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
                    UPDATE Citas
                    SET estado = @estado
                    OUTPUT INSERTED.*
                    WHERE cita_id = @id
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
                .query('DELETE FROM Citas WHERE cita_id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Cita; 