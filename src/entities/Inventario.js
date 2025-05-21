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
                .input('precio_compra', mssql.Decimal(10, 2), articulo.precio_compra)
                .input('precio_venta', mssql.Decimal(10, 2), articulo.precio_venta)
                .query(`
                    INSERT INTO Inventario (
                        codigo, nombre, descripcion, categoria, subcategoria,
                        marca, modelo, stock_actual, stock_minimo, stock_maximo,
                        unidad_medida, precio_compra, precio_venta
                    )
                    VALUES (
                        @codigo, @nombre, @descripcion, @categoria, @subcategoria,
                        @marca, @modelo, @stock_actual, @stock_minimo, @stock_maximo,
                        @unidad_medida, @precio_compra, @precio_venta
                    );
                    SELECT SCOPE_IDENTITY() AS articulo_id;
                `);
            
            const articuloId = result.recordset[0].articulo_id;
            const articuloCreado = await this.findById(articuloId);
            return articuloCreado;
            
        } catch (error) {
            if (error.message.includes('UNIQUE KEY constraint')) {
                throw new Error('El código del artículo ya existe');
            }
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request().query('SELECT * FROM Inventario');
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

    static async findByCategoria(categoria) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('categoria', mssql.VarChar(50), categoria)
                .query('SELECT * FROM Inventario WHERE categoria = @categoria');
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
                .input('stock_actual', mssql.Int, articulo.stock_actual)
                .input('stock_minimo', mssql.Int, articulo.stock_minimo)
                .input('stock_maximo', mssql.Int, articulo.stock_maximo)
                .input('unidad_medida', mssql.VarChar(20), articulo.unidad_medida)
                .input('precio_compra', mssql.Decimal(10, 2), articulo.precio_compra)
                .input('precio_venta', mssql.Decimal(10, 2), articulo.precio_venta)
                .query(`
                    UPDATE Inventario
                    SET codigo = @codigo,
                        nombre = @nombre,
                        descripcion = @descripcion,
                        categoria = @categoria,
                        subcategoria = @subcategoria,
                        marca = @marca,
                        modelo = @modelo,
                        stock_actual = @stock_actual,
                        stock_minimo = @stock_minimo,
                        stock_maximo = @stock_maximo,
                        unidad_medida = @unidad_medida,
                        precio_compra = @precio_compra,
                        precio_venta = @precio_venta,
                        ultima_actualizacion = GETDATE()
                    OUTPUT INSERTED.*
                    WHERE articulo_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            if (error.message.includes('UNIQUE KEY constraint')) {
                throw new Error('El código del artículo ya existe');
            }
            throw error;
        }
    }

    static async delete(id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .query('DELETE FROM Inventario WHERE articulo_id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }

    static async updateStock(id, cantidad) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('cantidad', mssql.Int, cantidad)
                .query(`
                    UPDATE Inventario
                    SET stock_actual = stock_actual + @cantidad,
                        ultima_actualizacion = GETDATE()
                    OUTPUT INSERTED.*
                    WHERE articulo_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Inventario; 