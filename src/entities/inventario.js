const { getConnection, mssql } = require('../config/database');

class Inventario {
    static async create(articulo) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('codigo', mssql.VarChar(50), articulo.codigo)
                .input('nombre', mssql.VarChar(100), articulo.nombre)
                .input('descripcion', mssql.Text, articulo.descripcion)
                .input('categoria', mssql.VarChar(50), articulo.categoria)
                .input('subcategoria', mssql.VarChar(50), articulo.subcategoria)
                .input('marca', mssql.VarChar(50), articulo.marca)
                .input('modelo', mssql.VarChar(50), articulo.modelo)
                .input('stock_actual', mssql.Int, articulo.stock_actual || 0)
                .input('stock_minimo', mssql.Int, articulo.stock_minimo || 5)
                .input('stock_maximo', mssql.Int, articulo.stock_maximo || 100)
                .input('unidad_medida', mssql.VarChar(20), articulo.unidad_medida)
                .input('ubicacion', mssql.VarChar(50), articulo.ubicacion)
                .input('precio_compra', mssql.Decimal(10, 2), articulo.precio_compra)
                .input('precio_venta', mssql.Decimal(10, 2), articulo.precio_venta)
                .query(`
                    INSERT INTO Inventario (
                        codigo, nombre, descripcion, categoria, subcategoria,
                        marca, modelo, stock_actual, stock_minimo, stock_maximo,
                        unidad_medida, ubicacion, precio_compra, precio_venta
                    )
                    OUTPUT INSERTED.*
                    VALUES (
                        @codigo, @nombre, @descripcion, @categoria, @subcategoria,
                        @marca, @modelo, @stock_actual, @stock_minimo, @stock_maximo,
                        @unidad_medida, @ubicacion, @precio_compra, @precio_venta
                    )
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .query('SELECT * FROM Inventario ORDER BY nombre');
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
                .query('SELECT * FROM Inventario WHERE articulo_id = @id');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByCodigo(codigo) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('codigo', mssql.VarChar(50), codigo)
                .query('SELECT * FROM Inventario WHERE codigo = @codigo');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async search(query) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('query', mssql.VarChar(100), `%${query}%`)
                .query(`
                    SELECT * FROM Inventario 
                    WHERE nombre LIKE @query 
                    OR codigo LIKE @query 
                    OR descripcion LIKE @query
                    OR marca LIKE @query
                    OR modelo LIKE @query
                    ORDER BY nombre
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findByCategoria(categoria) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('categoria', mssql.VarChar(50), categoria)
                .query('SELECT * FROM Inventario WHERE categoria = @categoria ORDER BY nombre');
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, articulo) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('codigo', mssql.VarChar(50), articulo.codigo)
                .input('nombre', mssql.VarChar(100), articulo.nombre)
                .input('descripcion', mssql.Text, articulo.descripcion)
                .input('categoria', mssql.VarChar(50), articulo.categoria)
                .input('subcategoria', mssql.VarChar(50), articulo.subcategoria)
                .input('marca', mssql.VarChar(50), articulo.marca)
                .input('modelo', mssql.VarChar(50), articulo.modelo)
                .input('stock_minimo', mssql.Int, articulo.stock_minimo)
                .input('stock_maximo', mssql.Int, articulo.stock_maximo)
                .input('unidad_medida', mssql.VarChar(20), articulo.unidad_medida)
                .input('ubicacion', mssql.VarChar(50), articulo.ubicacion)
                .input('precio_compra', mssql.Decimal(10, 2), articulo.precio_compra)
                .input('precio_venta', mssql.Decimal(10, 2), articulo.precio_venta)
                .input('ultima_actualizacion', mssql.DateTime, new Date())
                .query(`
                    UPDATE Inventario
                    SET codigo = @codigo,
                        nombre = @nombre,
                        descripcion = @descripcion,
                        categoria = @categoria,
                        subcategoria = @subcategoria,
                        marca = @marca,
                        modelo = @modelo,
                        stock_minimo = @stock_minimo,
                        stock_maximo = @stock_maximo,
                        unidad_medida = @unidad_medida,
                        ubicacion = @ubicacion,
                        precio_compra = @precio_compra,
                        precio_venta = @precio_venta,
                        ultima_actualizacion = @ultima_actualizacion
                    OUTPUT INSERTED.*
                    WHERE articulo_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateStock(id, cantidad, tipo_movimiento, usuario_id, motivo = null) {
        try {
            const pool = await getConnection();
            
            // Iniciar transacción
            const transaction = new mssql.Transaction(pool);
            await transaction.begin();
            
            try {
                // Obtener el artículo actual
                const articuloResult = await pool.request()
                    .input('id', mssql.Int, id)
                    .query('SELECT * FROM Inventario WHERE articulo_id = @id');
                
                const articulo = articuloResult.recordset[0];
                if (!articulo) {
                    throw new Error('Artículo no encontrado');
                }
                
                // Calcular nuevo stock
                let nuevoStock;
                if (tipo_movimiento === 'entrada') {
                    nuevoStock = articulo.stock_actual + cantidad;
                } else if (tipo_movimiento === 'salida') {
                    nuevoStock = articulo.stock_actual - cantidad;
                    if (nuevoStock < 0) {
                        throw new Error('Stock insuficiente');
                    }
                } else {
                    throw new Error('Tipo de movimiento inválido');
                }
                
                // Actualizar stock
                await pool.request()
                    .input('id', mssql.Int, id)
                    .input('stock_actual', mssql.Int, nuevoStock)
                    .input('ultima_actualizacion', mssql.DateTime, new Date())
                    .query(`
                        UPDATE Inventario
                        SET stock_actual = @stock_actual,
                            ultima_actualizacion = @ultima_actualizacion
                        WHERE articulo_id = @id
                    `);
                
                // Registrar movimiento
                await pool.request()
                    .input('articulo_id', mssql.Int, id)
                    .input('tipo_movimiento', mssql.VarChar(20), tipo_movimiento)
                    .input('cantidad', mssql.Int, cantidad)
                    .input('precio_unitario', mssql.Decimal(10, 2), tipo_movimiento === 'entrada' ? articulo.precio_compra : articulo.precio_venta)
                    .input('usuario_id', mssql.Int, usuario_id)
                    .input('motivo', mssql.VarChar(255), motivo)
                    .query(`
                        INSERT INTO Movimientos_Inventario (
                            articulo_id, tipo_movimiento, cantidad, 
                            precio_unitario, usuario_id, motivo
                        )
                        VALUES (
                            @articulo_id, @tipo_movimiento, @cantidad, 
                            @precio_unitario, @usuario_id, @motivo
                        )
                    `);
                
                // Confirmar transacción
                await transaction.commit();
                
                // Obtener el artículo actualizado
                const articuloActualizado = await this.findById(id);
                return articuloActualizado;
                
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
            
            // Verificar si el artículo tiene movimientos
            const movimientosResult = await pool.request()
                .input('articulo_id', mssql.Int, id)
                .query('SELECT COUNT(*) as count FROM Movimientos_Inventario WHERE articulo_id = @articulo_id');
            
            if (movimientosResult.recordset[0].count > 0) {
                throw new Error('No se puede eliminar un artículo con movimientos registrados');
            }
            
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .query('DELETE FROM Inventario WHERE articulo_id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getMovimientos(articuloId) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('articulo_id', mssql.Int, articuloId)
                .query(`
                    SELECT m.*, 
                           u.nombre as usuario_nombre,
                           u.apellidoPaterno as usuario_apellido,
                           a.nombre as articulo_nombre,
                           a.codigo as articulo_codigo
                    FROM Movimientos_Inventario m
                    INNER JOIN Usuarios u ON m.usuario_id = u.usuario_id
                    INNER JOIN Inventario a ON m.articulo_id = a.articulo_id
                    WHERE m.articulo_id = @articulo_id
                    ORDER BY m.fecha_movimiento DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async getAllMovimientos() {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .query(`
                    SELECT m.*, 
                           u.nombre as usuario_nombre,
                           u.apellidoPaterno as usuario_apellido,
                           a.nombre as articulo_nombre,
                           a.codigo as articulo_codigo
                    FROM Movimientos_Inventario m
                    INNER JOIN Usuarios u ON m.usuario_id = u.usuario_id
                    INNER JOIN Inventario a ON m.articulo_id = a.articulo_id
                    ORDER BY m.fecha_movimiento DESC
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async getBajoStock() {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .query(`
                    SELECT * FROM Inventario 
                    WHERE stock_actual <= stock_minimo
                    ORDER BY (stock_actual - stock_minimo)
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Inventario;