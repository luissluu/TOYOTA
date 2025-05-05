const { getConnection, mssql } = require('../config/database');

class Pedido {
    static async create(pedido) {
        try {
            const pool = await getConnection();
            
            // Iniciar transacción
            const transaction = new mssql.Transaction(pool);
            await transaction.begin();
            
            try {
                // Insertar pedido
                const pedidoResult = await pool.request()
                    .input('proveedor_id', mssql.Int, pedido.proveedor_id)
                    .input('fecha_entrega_esperada', mssql.Date, pedido.fecha_entrega_esperada)
                    .input('usuario_id', mssql.Int, pedido.usuario_id)
                    .query(`
                        INSERT INTO Pedidos (
                            proveedor_id, fecha_entrega_esperada, usuario_id
                        )
                        OUTPUT INSERTED.pedido_id
                        VALUES (
                            @proveedor_id, @fecha_entrega_esperada, @usuario_id
                        )
                    `);
                
                const pedidoId = pedidoResult.recordset[0].pedido_id;
                
                // Insertar detalles del pedido
                let total = 0;
                
                if (pedido.detalles && pedido.detalles.length > 0) {
                    for (const detalle of pedido.detalles) {
                        const detalleResult = await pool.request()
                            .input('pedido_id', mssql.Int, pedidoId)
                            .input('articulo_id', mssql.Int, detalle.articulo_id)
                            .input('cantidad_pedida', mssql.Int, detalle.cantidad_pedida)
                            .input('precio_unitario', mssql.Decimal(10, 2), detalle.precio_unitario)
                            .query(`
                                INSERT INTO Detalles_Pedido (
                                    pedido_id, articulo_id, cantidad_pedida, precio_unitario
                                )
                                VALUES (
                                    @pedido_id, @articulo_id, @cantidad_pedida, @precio_unitario
                                )
                            `);
                        
                        total += detalle.cantidad_pedida * detalle.precio_unitario;
                    }
                    
                    // Actualizar el total del pedido
                    await pool.request()
                        .input('pedido_id', mssql.Int, pedidoId)
                        .input('total', mssql.Decimal(10, 2), total)
                        .query(`
                            UPDATE Pedidos
                            SET total = @total
                            WHERE pedido_id = @pedido_id
                        `);
                }
                
                // Confirmar transacción
                await transaction.commit();
                
                // Obtener el pedido completo
                const pedidoCompleto = await this.findById(pedidoId);
                return pedidoCompleto;
                
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
                    SELECT p.*,
                           pr.nombre as proveedor_nombre,
                           u.nombre as usuario_nombre,
                           u.apellidoPaterno as usuario_apellido
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
            
            // Obtener el pedido
            const pedidoResult = await pool.request()
                .input('id', mssql.Int, id)
                .query(`
                    SELECT p.*,
                           pr.nombre as proveedor_nombre,
                           u.nombre as usuario_nombre,
                           u.apellidoPaterno as usuario_apellido
                    FROM Pedidos p
                    INNER JOIN Proveedores pr ON p.proveedor_id = pr.proveedor_id
                    INNER JOIN Usuarios u ON p.usuario_id = u.usuario_id
                    WHERE p.pedido_id = @id
                `);
            
            const pedido = pedidoResult.recordset[0];
            
            if (!pedido) {
                return null;
            }
            
            // Obtener los detalles del pedido
            const detallesResult = await pool.request()
                .input('pedido_id', mssql.Int, id)
                .query(`
                    SELECT dp.*,
                           a.nombre as articulo_nombre,
                           a.codigo as articulo_codigo
                    FROM Detalles_Pedido dp
                    INNER JOIN Inventario a ON dp.articulo_id = a.articulo_id
                    WHERE dp.pedido_id = @pedido_id
                `);
            
            pedido.detalles = detallesResult.recordset;
            
            return pedido;
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
                .query(`
                    UPDATE Pedidos
                    SET fecha_entrega_esperada = @fecha_entrega_esperada
                    WHERE pedido_id = @id;
                    
                    SELECT @id as pedido_id;
                `);
            
            if (result.rowsAffected[0] === 0) {
                return null;
            }
            
            // Obtener el pedido actualizado
            const pedidoActualizado = await this.findById(id);
            return pedidoActualizado;
        } catch (error) {
            throw error;
        }
    }

    static async recibirPedido(id, datos) {
        try {
            const pool = await getConnection();
            
            // Iniciar transacción
            const transaction = new mssql.Transaction(pool);
            await transaction.begin();
            
            try {
                // Actualizar fecha de recepción
                await pool.request()
                    .input('id', mssql.Int, id)
                    .input('fecha_recepcion', mssql.DateTime, new Date())
                    .query(`
                        UPDATE Pedidos
                        SET fecha_recepcion = @fecha_recepcion
                        WHERE pedido_id = @id
                    `);
                
                // Obtener detalles del pedido
                const detallesResult = await pool.request()
                    .input('pedido_id', mssql.Int, id)
                    .query(`
                        SELECT * FROM Detalles_Pedido
                        WHERE pedido_id = @pedido_id
                    `);
                
                const detalles = detallesResult.recordset;
                
                // Procesar cada detalle recibido
                for (const detalle of datos.detalles) {
                    // Actualizar cantidad recibida
                    await pool.request()
                        .input('detalle_id', mssql.Int, detalle.detalle_pedido_id)
                        .input('cantidad_recibida', mssql.Int, detalle.cantidad_recibida)
                        .input('estado', mssql.VarChar(20), detalle.cantidad_recibida > 0 ? 'recibido' : 'pendiente')
                        .query(`
                            UPDATE Detalles_Pedido
                            SET cantidad_recibida = @cantidad_recibida,
                                estado = @estado
                            WHERE detalle_pedido_id = @detalle_id
                        `);
                    
                    // Actualizar inventario
                    if (detalle.cantidad_recibida > 0) {
                        // Obtener información del detalle
                        const detalleInfo = detalles.find(d => d.detalle_pedido_id === detalle.detalle_pedido_id);
                        
                        if (detalleInfo) {
                            // Actualizar stock
                            await pool.request()
                                .input('articulo_id', mssql.Int, detalleInfo.articulo_id)
                                .input('cantidad', mssql.Int, detalle.cantidad_recibida)
                                .query(`
                                    UPDATE Inventario
                                    SET stock_actual = stock_actual + @cantidad,
                                        ultima_actualizacion = GETDATE()
                                    WHERE articulo_id = @articulo_id
                                `);
                            
                            // Registrar movimiento
                            await pool.request()
                                .input('articulo_id', mssql.Int, detalleInfo.articulo_id)
                                .input('tipo_movimiento', mssql.VarChar(20), 'entrada')
                                .input('cantidad', mssql.Int, detalle.cantidad_recibida)
                                .input('orden_id', mssql.Int, null)
                                .input('proveedor_id', mssql.Int, datos.proveedor_id)
                                .input('precio_unitario', mssql.Decimal(10, 2), detalleInfo.precio_unitario)
                                .input('usuario_id', mssql.Int, datos.usuario_id)
                                .input('motivo', mssql.VarChar(255), `Recepción de pedido #${id}`)
                                .input('numero_factura', mssql.VarChar(50), datos.numero_factura || null)
                                .query(`
                                    INSERT INTO Movimientos_Inventario (
                                        articulo_id, tipo_movimiento, cantidad, proveedor_id, 
                                        precio_unitario, usuario_id, motivo, numero_factura
                                    )
                                    VALUES (
                                        @articulo_id, @tipo_movimiento, @cantidad, @proveedor_id,
                                        @precio_unitario, @usuario_id, @motivo, @numero_factura
                                    )
                                `);
                        }
                    }
                }
                
                // Confirmar transacción
                await transaction.commit();
                
                // Obtener el pedido actualizado
                const pedidoActualizado = await this.findById(id);
                return pedidoActualizado;
                
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
                // Verificar si el pedido ya fue recibido
                const pedidoResult = await pool.request()
                    .input('id', mssql.Int, id)
                    .query('SELECT fecha_recepcion FROM Pedidos WHERE pedido_id = @id');
                
                if (pedidoResult.recordset.length === 0) {
                    throw new Error('Pedido no encontrado');
                }
                
                if (pedidoResult.recordset[0].fecha_recepcion) {
                    throw new Error('No se puede eliminar un pedido que ya ha sido recibido');
                }
                
                // Eliminar detalles del pedido
                await pool.request()
                    .input('pedido_id', mssql.Int, id)
                    .query('DELETE FROM Detalles_Pedido WHERE pedido_id = @pedido_id');
                
                // Eliminar el pedido
                const result = await pool.request()
                    .input('id', mssql.Int, id)
                    .query('DELETE FROM Pedidos WHERE pedido_id = @id');
                
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

    static async updateDetalle(detalleId, detalle) {
        try {
            const pool = await getConnection();
            
            // Verificar si el pedido ya fue recibido
            const pedidoResult = await pool.request()
                .input('detalle_id', mssql.Int, detalleId)
                .query(`
                    SELECT p.fecha_recepcion
                    FROM Pedidos p
                    INNER JOIN Detalles_Pedido dp ON p.pedido_id = dp.pedido_id
                    WHERE dp.detalle_pedido_id = @detalle_id
                `);
            
            if (pedidoResult.recordset.length === 0) {
                throw new Error('Detalle no encontrado');
            }
            
            if (pedidoResult.recordset[0].fecha_recepcion) {
                throw new Error('No se puede modificar un detalle de un pedido ya recibido');
            }
            
            const result = await pool.request()
                .input('detalle_id', mssql.Int, detalleId)
                .input('cantidad_pedida', mssql.Int, detalle.cantidad_pedida)
                .input('precio_unitario', mssql.Decimal(10, 2), detalle.precio_unitario)
                .query(`
                    UPDATE Detalles_Pedido
                    SET cantidad_pedida = @cantidad_pedida,
                        precio_unitario = @precio_unitario
                    OUTPUT INSERTED.*
                    WHERE detalle_pedido_id = @detalle_id
                `);
            
            if (result.rowsAffected[0] === 0) {
                return null;
            }
            
            // Actualizar el total del pedido
            const pedidoId = result.recordset[0].pedido_id;
            await pool.request()
                .input('pedido_id', mssql.Int, pedidoId)
                .query(`
                    UPDATE Pedidos
                    SET total = (
                        SELECT SUM(cantidad_pedida * precio_unitario)
                        FROM Detalles_Pedido
                        WHERE pedido_id = @pedido_id
                    )
                    WHERE pedido_id = @pedido_id
                `);
            
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async deleteDetalle(detalleId) {
        try {
            const pool = await getConnection();
            
            // Verificar si el pedido ya fue recibido
            const pedidoResult = await pool.request()
                .input('detalle_id', mssql.Int, detalleId)
                .query(`
                    SELECT p.pedido_id, p.fecha_recepcion
                    FROM Pedidos p
                    INNER JOIN Detalles_Pedido dp ON p.pedido_id = dp.pedido_id
                    WHERE dp.detalle_pedido_id = @detalle_id
                `);
            
            if (pedidoResult.recordset.length === 0) {
                throw new Error('Detalle no encontrado');
            }
            
            if (pedidoResult.recordset[0].fecha_recepcion) {
                throw new Error('No se puede eliminar un detalle de un pedido ya recibido');
            }
            
            const pedidoId = pedidoResult.recordset[0].pedido_id;
            
            const result = await pool.request()
                .input('detalle_id', mssql.Int, detalleId)
                .query('DELETE FROM Detalles_Pedido WHERE detalle_pedido_id = @detalle_id');
            
            // Actualizar el total del pedido
            await pool.request()
                .input('pedido_id', mssql.Int, pedidoId)
                .query(`
                    UPDATE Pedidos
                    SET total = (
                        SELECT SUM(cantidad_pedida * precio_unitario)
                        FROM Detalles_Pedido
                        WHERE pedido_id = @pedido_id
                    )
                    WHERE pedido_id = @pedido_id
                `);
            
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }

    static async addDetalle(pedidoId, detalle) {
        try {
            const pool = await getConnection();
            
            // Verificar si el pedido ya fue recibido
            const pedidoResult = await pool.request()
                .input('pedido_id', mssql.Int, pedidoId)
                .query('SELECT fecha_recepcion FROM Pedidos WHERE pedido_id = @pedido_id');
            
            if (pedidoResult.recordset.length === 0) {
                throw new Error('Pedido no encontrado');
            }
            
            if (pedidoResult.recordset[0].fecha_recepcion) {
                throw new Error('No se puede añadir detalles a un pedido ya recibido');
            }
            
            const result = await pool.request()
                .input('pedido_id', mssql.Int, pedidoId)
                .input('articulo_id', mssql.Int, detalle.articulo_id)
                .input('cantidad_pedida', mssql.Int, detalle.cantidad_pedida)
                .input('precio_unitario', mssql.Decimal(10, 2), detalle.precio_unitario)
                .query(`
                    INSERT INTO Detalles_Pedido (
                        pedido_id, articulo_id, cantidad_pedida, precio_unitario
                    )
                    OUTPUT INSERTED.*
                    VALUES (
                        @pedido_id, @articulo_id, @cantidad_pedida, @precio_unitario
                    )
                `);
            
            // Actualizar el total del pedido
            await pool.request()
                .input('pedido_id', mssql.Int, pedidoId)
                .query(`
                    UPDATE Pedidos
                    SET total = (
                        SELECT SUM(cantidad_pedida * precio_unitario)
                        FROM Detalles_Pedido
                        WHERE pedido_id = @pedido_id
                    )
                    WHERE pedido_id = @pedido_id
                `);
            
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Pedido;