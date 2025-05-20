const { getConnection, mssql } = require('../config/database');

class Cita {
    static async create(cita) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('usuario_id', mssql.Int, cita.usuario_id)
                .input('vehiculo_id', mssql.Int, cita.vehiculo_id)
                .input('fecha', mssql.Date, cita.fecha)
                .input('hora_inicio', mssql.Time, cita.hora_inicio)
                .input('hora_fin', mssql.Time, cita.hora_fin)
                .input('tipo_servicio', mssql.VarChar(100), cita.tipo_servicio)
                .input('estado', mssql.VarChar(20), cita.estado || 'programada')
                .input('descripcion', mssql.Text, cita.descripcion)
                .input('creado_por', mssql.Int, cita.creado_por)
                .query(`
                    INSERT INTO Citas (
                        usuario_id, vehiculo_id, fecha, hora_inicio, hora_fin,
                        tipo_servicio, estado, descripcion, creado_por
                    )
                    VALUES (
                        @usuario_id, @vehiculo_id, @fecha, @hora_inicio, @hora_fin,
                        @tipo_servicio, @estado, @descripcion, @creado_por
                    );
                    SELECT SCOPE_IDENTITY() AS cita_id;
                `);
            
            const citaId = result.recordset[0].cita_id;
            const citaCreada = await this.findById(citaId);
            return citaCreada;
            
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .query(`
                    SELECT c.*, 
                           u.nombre as cliente_nombre, 
                           u.apellidoPaterno as cliente_apellido,
                           v.placa as vehiculo_placa,
                           v.marca as vehiculo_marca,
                           v.modelo as vehiculo_modelo
                    FROM Citas c
                    INNER JOIN Usuarios u ON c.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON c.vehiculo_id = v.vehiculo_id
                    ORDER BY c.fecha DESC, c.hora_inicio DESC
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
                           u.nombre as cliente_nombre, 
                           u.apellidoPaterno as cliente_apellido,
                           v.placa as vehiculo_placa,
                           v.marca as vehiculo_marca,
                           v.modelo as vehiculo_modelo
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

    static async findByUsuario(usuario_id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('usuario_id', mssql.Int, usuario_id)
                .query(`
                    SELECT c.*, 
                           v.placa as vehiculo_placa,
                           v.marca as vehiculo_marca,
                           v.modelo as vehiculo_modelo
                    FROM Citas c
                    INNER JOIN Vehiculos v ON c.vehiculo_id = v.vehiculo_id
                    WHERE c.usuario_id = @usuario_id
                    ORDER BY c.fecha DESC, c.hora_inicio DESC
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
                           u.nombre as cliente_nombre, 
                           u.apellidoPaterno as cliente_apellido,
                           v.placa as vehiculo_placa,
                           v.marca as vehiculo_marca,
                           v.modelo as vehiculo_modelo
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

    static async update(id, cita) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('fecha', mssql.Date, cita.fecha)
                .input('hora_inicio', mssql.Time, cita.hora_inicio)
                .input('hora_fin', mssql.Time, cita.hora_fin)
                .input('tipo_servicio', mssql.VarChar(100), cita.tipo_servicio)
                .input('estado', mssql.VarChar(20), cita.estado)
                .input('descripcion', mssql.Text, cita.descripcion)
                .query(`
                    UPDATE Citas
                    SET fecha = @fecha,
                        hora_inicio = @hora_inicio,
                        hora_fin = @hora_fin,
                        tipo_servicio = @tipo_servicio,
                        estado = @estado,
                        descripcion = @descripcion
                    WHERE cita_id = @id;
                    
                    SELECT @id as cita_id;
                `);
            
            if (result.rowsAffected[0] === 0) {
                return null;
            }
            
            const citaActualizada = await this.findById(id);
            return citaActualizada;
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

    static async updateEstado(id, estado) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('estado', mssql.VarChar(20), estado)
                .query(`
                    UPDATE Citas
                    SET estado = @estado
                    WHERE cita_id = @id
                `);
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Cita;