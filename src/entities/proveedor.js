const { getConnection, mssql } = require('../config/database');

class Proveedor {
    static async create(proveedor) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('nombre', mssql.VarChar(100), proveedor.nombre)
                .input('contacto', mssql.VarChar(100), proveedor.contacto)
                .input('telefono', mssql.VarChar(20), proveedor.telefono)
                .input('correo', mssql.VarChar(100), proveedor.correo)
                .input('direccion', mssql.VarChar(255), proveedor.direccion)
                .input('ciudad', mssql.VarChar(100), proveedor.ciudad)
                .input('estado_provincia', mssql.VarChar(100), proveedor.estado_provincia)
                .input('codigo_postal', mssql.VarChar(20), proveedor.codigo_postal)
                .input('notas', mssql.Text, proveedor.notas)
                .query(`
                    INSERT INTO Proveedores (
                        nombre, contacto, telefono, correo, direccion,
                        ciudad, estado_provincia, codigo_postal, notas
                    )
                    OUTPUT INSERTED.*
                    VALUES (
                        @nombre, @contacto, @telefono, @correo, @direccion,
                        @ciudad, @estado_provincia, @codigo_postal, @notas
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
                .query('SELECT * FROM Proveedores ORDER BY nombre');
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
                .query('SELECT * FROM Proveedores WHERE proveedor_id = @id');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, proveedor) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('nombre', mssql.VarChar(100), proveedor.nombre)
                .input('contacto', mssql.VarChar(100), proveedor.contacto)
                .input('telefono', mssql.VarChar(20), proveedor.telefono)
                .input('correo', mssql.VarChar(100), proveedor.correo)
                .input('direccion', mssql.VarChar(255), proveedor.direccion)
                .input('ciudad', mssql.VarChar(100), proveedor.ciudad)
                .input('estado_provincia', mssql.VarChar(100), proveedor.estado_provincia)
                .input('codigo_postal', mssql.VarChar(20), proveedor.codigo_postal)
                .input('notas', mssql.Text, proveedor.notas)
                .query(`
                    UPDATE Proveedores
                    SET nombre = @nombre,
                        contacto = @contacto,
                        telefono = @telefono,
                        correo = @correo,
                        direccion = @direccion,
                        ciudad = @ciudad,
                        estado_provincia = @estado_provincia,
                        codigo_postal = @codigo_postal,
                        notas = @notas
                    OUTPUT INSERTED.*
                    WHERE proveedor_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const pool = await getConnection();
            
            // Verificar si hay pedidos asociados
            const pedidosResult = await pool.request()
                .input('proveedor_id', mssql.Int, id)
                .query('SELECT COUNT(*) as count FROM Pedidos WHERE proveedor_id = @proveedor_id');
            
            if (pedidosResult.recordset[0].count > 0) {
                throw new Error('No se puede eliminar un proveedor con pedidos asociados');
            }
            
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .query('DELETE FROM Proveedores WHERE proveedor_id = @id');
            return result.rowsAffected[0] > 0;
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
                    SELECT * FROM Proveedores 
                    WHERE nombre LIKE @query 
                    OR contacto LIKE @query 
                    OR correo LIKE @query
                    ORDER BY nombre
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Proveedor;