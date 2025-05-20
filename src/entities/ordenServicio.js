const { getConnection, mssql } = require('../config/database');

class OrdenServicio {
    static async create(orden) {
        try {
            const pool = await getConnection();
            
            // Iniciar transacción
            const transaction = new mssql.Transaction(pool);
            await transaction.begin();
            
            try {
                // Insertar orden de servicio
                const result = await pool.request()
                    .input('cita_id', mssql.Int, orden.cita_id)
                    .input('usuario_id', mssql.Int, orden.usuario_id)
                    .input('vehiculo_id', mssql.Int, orden.vehiculo_id)
                    .input('fecha_inicio', mssql.DateTime, orden.fecha_inicio || new Date())
                    .input('estado', mssql.VarChar(30), orden.estado || 'abierta')
                    .input('diagnostico', mssql.Text, orden.diagnostico)
                    .input('notas', mssql.Text, orden.notas)
                    .input('creado_por', mssql.Int, orden.creado_por)
                    .input('kilometraje', mssql.Int, orden.kilometraje)
                    .query(`
                        INSERT INTO Ordenes_Servicio (
                            cita_id, usuario_id, vehiculo_id, fecha_inicio,
                            estado, diagnostico, notas, creado_por, kilometraje
                        )
                        VALUES (
                            @cita_id, @usuario_id, @vehiculo_id, @fecha_inicio,
                            @estado, @diagnostico, @notas, @creado_por, @kilometraje
                        );
                        SELECT SCOPE_IDENTITY() AS orden_id;
                    `);
                
                const ordenId = result.recordset[0].orden_id;
                
                // Insertar detalles de la orden si existen
                if (orden.detalles && orden.detalles.length > 0) {
                    for (const detalle of orden.detalles) {
                        await pool.request()
                            .input('orden_id', mssql.Int, ordenId)
                            .input('servicio_id', mssql.Int, detalle.servicio_id)
                            .input('descripcion', mssql.Text, detalle.descripcion)
                            .input('precio', mssql.Decimal(10, 2), detalle.precio)
                            .input('mecanico_id', mssql.Int, detalle.mecanico_id)
                            .input('estado', mssql.VarChar(20), detalle.estado || 'pendiente')
                            .input('horas_trabajo', mssql.Decimal(5, 2), detalle.horas_trabajo)
                            .input('notas', mssql.Text, detalle.notas)
                            .query(`
                                INSERT INTO Detalles_Orden (
                                    orden_id, servicio_id, descripcion, precio, 
                                    mecanico_id, estado, horas_trabajo, notas
                                )
                                VALUES (
                                    @orden_id, @servicio_id, @descripcion, @precio,
                                    @mecanico_id, @estado, @horas_trabajo, @notas
                                )
                            `);
                    }
                }
                
                // Si hay una cita, actualizar su estado
                if (orden.cita_id) {
                    await pool.request()
                        .input('cita_id', mssql.Int, orden.cita_id)
                        .query(`
                            UPDATE Citas
                            SET estado = 'en_proceso'
                            WHERE cita_id = @cita_id
                        `);
                }
                
                // Actualizar historial de vehículo
                await pool.request()
                    .input('vehiculo_id', mssql.Int, orden.vehiculo_id)
                    .input('orden_id', mssql.Int, ordenId)
                    .input('usuario_id', mssql.Int, orden.usuario_id)
                    .input('tipo_servicio', mssql.VarChar(100), orden.tipo_servicio || 'Mantenimiento general')
                    .input('descripcion', mssql.Text, orden.notas || orden.diagnostico)
                    .input('kilometraje', mssql.Int, orden.kilometraje)
                    .input('mecanico_id', mssql.Int, orden.creado_por)
                    .query(`
                        INSERT INTO Historial_Vehiculo (
                            vehiculo_id, orden_id, usuario_id, tipo_servicio,
                            descripcion, kilometraje, mecanico_id
                        )
                        VALUES (
                            @vehiculo_id, @orden_id, @usuario_id, @tipo_servicio,
                            @descripcion, @kilometraje, @mecanico_id
                        )
                    `);
                
                // Confirmar transacción
                await transaction.commit();
                
                // Obtener la orden completa
                const ordenCompleta = await this.findById(ordenId);
                return ordenCompleta;
                
            } catch (error) {
                // Rollback en caso de error
                await transaction.rollback();
                throw error;
            }
            
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .query(`
                    SELECT o.*,
                           u.nombre as cliente_nombre,
                           u.apellidoPaterno as cliente_apellido,
                           v.placa as vehiculo_placa,
                           v.marca as vehiculo_marca,
                           v.modelo as vehiculo_modelo
                    FROM Ordenes_Servicio o
                    INNER JOIN Usuarios u ON o.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON o.vehiculo_id = v.vehiculo_id
                    ORDER BY o.fecha_creacion DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const pool = await getConnection();
            
            // Obtener la orden
            const ordenResult = await pool.request()
                .input('id', mssql.Int, id)
                .query(`
                    SELECT o.*,
                           u.nombre as cliente_nombre,
                           u.apellidoPaterno as cliente_apellido,
                           v.placa as vehiculo_placa,
                           v.marca as vehiculo_marca,
                           v.modelo as vehiculo_modelo
                    FROM Ordenes_Servicio o
                    INNER JOIN Usuarios u ON o.usuario_id = u.usuario_id
                    INNER JOIN Vehiculos v ON o.vehiculo_id = v.vehiculo_id
                    WHERE o.orden_id = @id
                `);
            
            const orden = ordenResult.recordset[0];
            
            if (!orden) {
                return null;
            }
            
            // Obtener los detalles de la orden
            const detallesResult = await pool.request()
                .input('orden_id', mssql.Int, id)
                .query(`
                    SELECT d.*,
                           s.nombre as servicio_nombre,
                           u.nombre as mecanico_nombre,
                           u.apellidoPaterno as mecanico_apellido
                    FROM Detalles_Orden d
                    INNER JOIN Servicios s ON d.servicio_id = s.servicio_id
                    LEFT JOIN Usuarios u ON d.mecanico_id = u.usuario_id
                    WHERE d.orden_id = @orden_id
                `);
            
            orden.detalles = detallesResult.recordset;
            
            return orden;
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
                           v.placa as vehiculo_placa,
                           v.marca as vehiculo_marca,
                           v.modelo as vehiculo_modelo
                    FROM Ordenes_Servicio o
                    INNER JOIN Vehiculos v ON o.vehiculo_id = v.vehiculo_id
                    WHERE o.usuario_id = @usuario_id
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
            
            // Actualizar la orden principal
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('diagnostico', mssql.Text, orden.diagnostico)
                .input('notas', mssql.Text, orden.notas)
                .input('estado', mssql.VarChar(30), orden.estado)
                .input('kilometraje', mssql.Int, orden.kilometraje)
                .query(`
                    UPDATE Ordenes_Servicio
                    SET diagnostico = @diagnostico,
                        notas = @notas,
                        estado = @estado,
                        kilometraje = @kilometraje
                    WHERE orden_id = @id;
                    
                    SELECT @id as orden_id;
                `);
            
            if (result.rowsAffected[0] === 0) {
                return null;
            }
            
            // Obtener la orden actualizada
            const ordenActualizada = await this.findById(id);
            return ordenActualizada;
        } catch (error) {
            throw error;
        }
    }

    static async finalizar(id, datos) {
        try {
            const pool = await getConnection();
            
            // Iniciar transacción
            const transaction = new mssql.Transaction(pool);
            await transaction.begin();
            
            try {
                // Actualizar la orden principal
                await pool.request()
                    .input('id', mssql.Int, id)
                    .input('fecha_finalizacion', mssql.DateTime, new Date())
                    .input('estado', mssql.VarChar(30), 'completada')
                    .input('total', mssql.Decimal(10, 2), datos.total)
                    .query(`
                        UPDATE Ordenes_Servicio
                        SET fecha_finalizacion = @fecha_finalizacion,
                            estado = @estado,
                            total = @total
                        WHERE orden_id = @id
                    `);
                
                // Si hay una cita, actualizar su estado
                await pool.request()
                    .input('id', mssql.Int, id)
                    .query(`
                        UPDATE c
                        SET c.estado = 'completada'
                        FROM Citas c
                        INNER JOIN Ordenes_Servicio o ON c.cita_id = o.cita_id
                        WHERE o.orden_id = @id
                    `);
                
                // Confirmar transacción
                await transaction.commit();
                
                // Obtener la orden completa
                const ordenCompleta = await this.findById(id);
                return ordenCompleta;
                
            } catch (error) {
                // Rollback en caso de error
                await transaction.rollback();
                throw error;
            }
            
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const pool = await getConnection();
            
            // Iniciar transacción
            const transaction = new mssql.Transaction(pool);
            await transaction.begin();
            
            try {
                // Eliminar primero los detalles de la orden
                await pool.request()
                    .input('orden_id', mssql.Int, id)
                    .query('DELETE FROM Detalles_Orden WHERE orden_id = @orden_id');
                
                // Eliminar registros del historial de vehículo
                await pool.request()
                    .input('orden_id', mssql.Int, id)
                    .query('DELETE FROM Historial_Vehiculo WHERE orden_id = @orden_id');
                
                // Finalmente eliminar la orden
                const result = await pool.request()
                    .input('id', mssql.Int, id)
                    .query('DELETE FROM Ordenes_Servicio WHERE orden_id = @id');
                
                // Confirmar transacción
                await transaction.commit();
                
                return result.rowsAffected[0] > 0;
                
            } catch (error) {
                // Rollback en caso de error
                await transaction.rollback();
                throw error;
            }
            
        } catch (error) {
            throw error;
        }
    }

    static async addDetalle(ordenId, detalle) {
        try {
            const pool = await getConnection();
            
            const result = await pool.request()
                .input('orden_id', mssql.Int, ordenId)
                .input('servicio_id', mssql.Int, detalle.servicio_id)
                .input('descripcion', mssql.Text, detalle.descripcion)
                .input('precio', mssql.Decimal(10, 2), detalle.precio)
                .input('mecanico_id', mssql.Int, detalle.mecanico_id)
                .input('estado', mssql.VarChar(20), detalle.estado || 'pendiente')
                .input('horas_trabajo', mssql.Decimal(5, 2), detalle.horas_trabajo)
                .input('notas', mssql.Text, detalle.notas)
                .query(`
                    INSERT INTO Detalles_Orden (
                        orden_id, servicio_id, descripcion, precio, 
                        mecanico_id, estado, horas_trabajo, notas
                    )
                    OUTPUT INSERTED.*
                    VALUES (
                        @orden_id, @servicio_id, @descripcion, @precio,
                        @mecanico_id, @estado, @horas_trabajo, @notas
                    )
                `);
            
            // Actualizar el total de la orden
            await pool.request()
                .input('orden_id', mssql.Int, ordenId)
                .query(`
                    UPDATE o
                    SET o.total = (SELECT SUM(precio) FROM Detalles_Orden WHERE orden_id = @orden_id)
                    FROM Ordenes_Servicio o
                    WHERE o.orden_id = @orden_id
                `);
            
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateDetalle(detalleId, detalle) {
        try {
            const pool = await getConnection();
            
            const result = await pool.request()
                .input('detalle_id', mssql.Int, detalleId)
                .input('descripcion', mssql.Text, detalle.descripcion)
                .input('precio', mssql.Decimal(10, 2), detalle.precio)
                .input('mecanico_id', mssql.Int, detalle.mecanico_id)
                .input('estado', mssql.VarChar(20), detalle.estado)
                .input('horas_trabajo', mssql.Decimal(5, 2), detalle.horas_trabajo)
                .input('notas', mssql.Text, detalle.notas)
                .query(`
                    UPDATE Detalles_Orden
                    SET descripcion = @descripcion,
                        precio = @precio,
                        mecanico_id = @mecanico_id,
                        estado = @estado,
                        horas_trabajo = @horas_trabajo,
                        notas = @notas
                    OUTPUT INSERTED.*
                    WHERE detalle_id = @detalle_id
                `);
            
            if (result.rowsAffected[0] === 0) {
                return null;
            }
            
            // Actualizar el total de la orden
            const detalleActualizado = result.recordset[0];
            await pool.request()
                .input('orden_id', mssql.Int, detalleActualizado.orden_id)
                .query(`
                    UPDATE o
                    SET o.total = (SELECT SUM(precio) FROM Detalles_Orden WHERE orden_id = @orden_id)
                    FROM Ordenes_Servicio o
                    WHERE o.orden_id = @orden_id
                `);
            
            return detalleActualizado;
        } catch (error) {
            throw error;
        }
    }

    static async deleteDetalle(detalleId) {
        try {
            const pool = await getConnection();
            
            // Obtener el orden_id antes de eliminar
            const detalleResult = await pool.request()
                .input('detalle_id', mssql.Int, detalleId)
                .query('SELECT orden_id FROM Detalles_Orden WHERE detalle_id = @detalle_id');
            
            if (detalleResult.recordset.length === 0) {
                return false;
            }
            
            const ordenId = detalleResult.recordset[0].orden_id;
            
            // Eliminar el detalle
            const result = await pool.request()
                .input('detalle_id', mssql.Int, detalleId)
                .query('DELETE FROM Detalles_Orden WHERE detalle_id = @detalle_id');
            
            // Actualizar el total de la orden
            await pool.request()
                .input('orden_id', mssql.Int, ordenId)
                .query(`
                    UPDATE o
                    SET o.total = (SELECT SUM(precio) FROM Detalles_Orden WHERE orden_id = @orden_id)
                    FROM Ordenes_Servicio o
                    WHERE o.orden_id = @orden_id
                `);
            
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrdenServicio;