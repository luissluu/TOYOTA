const { getConnection, mssql } = require('../config/database');

class HistorialVehiculo {
    static async create(historial) {
        try {
            const pool = await getConnection();
            
            // Verificar que el mecánico existe y tiene el rol correcto
            if (historial.mecanico_id) {
                const mecanicoResult = await pool.request()
                    .input('mecanico_id', mssql.Int, historial.mecanico_id)
                    .query(`
                        SELECT u.*, r.tipo_rol
                        FROM Usuarios u
                        INNER JOIN Roles r ON u.rol_id = r.rol_id
                        WHERE u.usuario_id = @mecanico_id
                    `);
                
                const mecanico = mecanicoResult.recordset[0];
                if (!mecanico) {
                    throw new Error('El mecánico especificado no existe');
                }
                if (mecanico.tipo_rol !== 'mecanico') {
                    throw new Error('El usuario especificado no es un mecánico');
                }
            }

            const result = await pool.request()
                .input('vehiculo_id', mssql.Int, historial.vehiculo_id)
                .input('orden_id', mssql.Int, historial.orden_id)
                .input('usuario_id', mssql.Int, historial.usuario_id)
                .input('tipo_servicio', mssql.VarChar(100), historial.tipo_servicio)
                .input('descripcion', mssql.Text, historial.descripcion)
                .input('kilometraje', mssql.Int, historial.kilometraje)
                .input('observaciones', mssql.Text, historial.observaciones)
                .input('mecanico_id', mssql.Int, historial.mecanico_id)
                .query(`
                    INSERT INTO Historial_Vehiculo (
                        vehiculo_id, orden_id, usuario_id, tipo_servicio,
                        descripcion, kilometraje, observaciones, mecanico_id
                    )
                    VALUES (
                        @vehiculo_id, @orden_id, @usuario_id, @tipo_servicio,
                        @descripcion, @kilometraje, @observaciones, @mecanico_id
                    );
                    SELECT SCOPE_IDENTITY() AS historial_id;
                `);
            
            const historialId = result.recordset[0].historial_id;
            const historialCreado = await this.findById(historialId);
            return historialCreado;
            
        } catch (error) {
            if (error.message.includes('FOREIGN KEY constraint')) {
                throw new Error('El vehículo, orden o usuario especificado no existe');
            }
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request().query(`
                SELECT h.*, 
                       v.placa,
                       v.marca,
                       v.modelo,
                       o.numero_orden,
                       u.nombre as nombre_usuario,
                       u.apellidoPaterno as apellido_usuario,
                       m.nombre as nombre_mecanico,
                       m.apellidoPaterno as apellido_mecanico
                FROM Historial_Vehiculo h
                INNER JOIN Vehiculos v ON h.vehiculo_id = v.vehiculo_id
                INNER JOIN Ordenes_Servicio o ON h.orden_id = o.orden_id
                INNER JOIN Usuarios u ON h.usuario_id = u.usuario_id
                LEFT JOIN Usuarios m ON h.mecanico_id = m.usuario_id
                ORDER BY h.fecha DESC
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
                    SELECT h.*, 
                           v.placa,
                           v.marca,
                           v.modelo,
                           o.numero_orden,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario,
                           m.nombre as nombre_mecanico,
                           m.apellidoPaterno as apellido_mecanico
                    FROM Historial_Vehiculo h
                    INNER JOIN Vehiculos v ON h.vehiculo_id = v.vehiculo_id
                    INNER JOIN Ordenes_Servicio o ON h.orden_id = o.orden_id
                    INNER JOIN Usuarios u ON h.usuario_id = u.usuario_id
                    LEFT JOIN Usuarios m ON h.mecanico_id = m.usuario_id
                    WHERE h.historial_id = @id
                `);
            return result.recordset[0];
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
                    SELECT h.*, 
                           v.placa,
                           v.marca,
                           v.modelo,
                           o.numero_orden,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario,
                           m.nombre as nombre_mecanico,
                           m.apellidoPaterno as apellido_mecanico
                    FROM Historial_Vehiculo h
                    INNER JOIN Vehiculos v ON h.vehiculo_id = v.vehiculo_id
                    INNER JOIN Ordenes_Servicio o ON h.orden_id = o.orden_id
                    INNER JOIN Usuarios u ON h.usuario_id = u.usuario_id
                    LEFT JOIN Usuarios m ON h.mecanico_id = m.usuario_id
                    WHERE h.vehiculo_id = @vehiculo_id
                    ORDER BY h.fecha DESC
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
                    SELECT h.*, 
                           v.placa,
                           v.marca,
                           v.modelo,
                           o.numero_orden,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario,
                           m.nombre as nombre_mecanico,
                           m.apellidoPaterno as apellido_mecanico
                    FROM Historial_Vehiculo h
                    INNER JOIN Vehiculos v ON h.vehiculo_id = v.vehiculo_id
                    INNER JOIN Ordenes_Servicio o ON h.orden_id = o.orden_id
                    INNER JOIN Usuarios u ON h.usuario_id = u.usuario_id
                    LEFT JOIN Usuarios m ON h.mecanico_id = m.usuario_id
                    WHERE h.orden_id = @orden_id
                    ORDER BY h.fecha DESC
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
                    SELECT h.*, 
                           v.placa,
                           v.marca,
                           v.modelo,
                           o.numero_orden,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario,
                           m.nombre as nombre_mecanico,
                           m.apellidoPaterno as apellido_mecanico
                    FROM Historial_Vehiculo h
                    INNER JOIN Vehiculos v ON h.vehiculo_id = v.vehiculo_id
                    INNER JOIN Ordenes_Servicio o ON h.orden_id = o.orden_id
                    INNER JOIN Usuarios u ON h.usuario_id = u.usuario_id
                    LEFT JOIN Usuarios m ON h.mecanico_id = m.usuario_id
                    WHERE h.mecanico_id = @mecanico_id
                    ORDER BY h.fecha DESC
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
                    SELECT h.*, 
                           v.placa,
                           v.marca,
                           v.modelo,
                           o.numero_orden,
                           u.nombre as nombre_usuario,
                           u.apellidoPaterno as apellido_usuario,
                           m.nombre as nombre_mecanico,
                           m.apellidoPaterno as apellido_mecanico
                    FROM Historial_Vehiculo h
                    INNER JOIN Vehiculos v ON h.vehiculo_id = v.vehiculo_id
                    INNER JOIN Ordenes_Servicio o ON h.orden_id = o.orden_id
                    INNER JOIN Usuarios u ON h.usuario_id = u.usuario_id
                    LEFT JOIN Usuarios m ON h.mecanico_id = m.usuario_id
                    WHERE h.fecha BETWEEN @fecha_inicio AND @fecha_fin
                    ORDER BY h.fecha DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, historial) {
        try {
            const pool = await getConnection();
            
            // Verificar que el mecánico existe y tiene el rol correcto
            if (historial.mecanico_id) {
                const mecanicoResult = await pool.request()
                    .input('mecanico_id', mssql.Int, historial.mecanico_id)
                    .query(`
                        SELECT u.*, r.tipo_rol
                        FROM Usuarios u
                        INNER JOIN Roles r ON u.rol_id = r.rol_id
                        WHERE u.usuario_id = @mecanico_id
                    `);
                
                const mecanico = mecanicoResult.recordset[0];
                if (!mecanico) {
                    throw new Error('El mecánico especificado no existe');
                }
                if (mecanico.tipo_rol !== 'mecanico') {
                    throw new Error('El usuario especificado no es un mecánico');
                }
            }

            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('tipo_servicio', mssql.VarChar(100), historial.tipo_servicio)
                .input('descripcion', mssql.Text, historial.descripcion)
                .input('kilometraje', mssql.Int, historial.kilometraje)
                .input('observaciones', mssql.Text, historial.observaciones)
                .input('mecanico_id', mssql.Int, historial.mecanico_id)
                .query(`
                    UPDATE Historial_Vehiculo
                    SET tipo_servicio = @tipo_servicio,
                        descripcion = @descripcion,
                        kilometraje = @kilometraje,
                        observaciones = @observaciones,
                        mecanico_id = @mecanico_id
                    OUTPUT INSERTED.*
                    WHERE historial_id = @id
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
                .query('DELETE FROM Historial_Vehiculo WHERE historial_id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = HistorialVehiculo; 