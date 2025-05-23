const { getConnection, mssql } = require('../config/database');

class InventarioHerramienta {
    static async create(herramienta) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('nombre', mssql.NVarChar(100), herramienta.nombre)
                .input('tipo', mssql.NVarChar(50), herramienta.tipo)
                .input('estado', mssql.NVarChar(50), herramienta.estado)
                .input('cantidad', mssql.Int, herramienta.cantidad)
                .input('fecha_salida', mssql.Date, herramienta.fecha_salida || null)
                .input('fecha_regreso', mssql.Date, herramienta.fecha_regreso || null)
                .query(`
                    INSERT INTO Inventario_Herramientas (nombre, tipo, estado, cantidad, fecha_salida, fecha_regreso)
                    VALUES (@nombre, @tipo, @estado, @cantidad, @fecha_salida, @fecha_regreso);
                    SELECT SCOPE_IDENTITY() AS id;
                `);
            const id = result.recordset[0].id;
            return await this.findById(id);
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request().query('SELECT * FROM Inventario_Herramientas');
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
                .query('SELECT * FROM Inventario_Herramientas WHERE id = @id');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, herramienta) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('nombre', mssql.NVarChar(100), herramienta.nombre)
                .input('tipo', mssql.NVarChar(50), herramienta.tipo)
                .input('estado', mssql.NVarChar(50), herramienta.estado)
                .input('cantidad', mssql.Int, herramienta.cantidad)
                .input('fecha_salida', mssql.Date, herramienta.fecha_salida || null)
                .input('fecha_regreso', mssql.Date, herramienta.fecha_regreso || null)
                .query(`
                    UPDATE Inventario_Herramientas
                    SET nombre = @nombre,
                        tipo = @tipo,
                        estado = @estado,
                        cantidad = @cantidad,
                        fecha_salida = @fecha_salida,
                        fecha_regreso = @fecha_regreso
                    OUTPUT INSERTED.*
                    WHERE id = @id
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
                .query('DELETE FROM Inventario_Herramientas WHERE id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = InventarioHerramienta; 