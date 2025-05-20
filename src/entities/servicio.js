const { getConnection, mssql } = require('../config/database');

class Servicio {
    static async create(servicio) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('nombre', mssql.VarChar(100), servicio.nombre)
                .input('descripcion', mssql.Text, servicio.descripcion)
                .input('duracion_estimada', mssql.Int, servicio.duracion_estimada)
                .input('precio_estimado', mssql.Decimal(10,2), servicio.precio_estimado)
                .input('categoria', mssql.VarChar(50), servicio.categoria)
                .query(`
                    INSERT INTO Servicios (nombre, descripcion, duracion_estimada, precio_estimado, categoria)
                    OUTPUT INSERTED.*
                    VALUES (@nombre, @descripcion, @duracion_estimada, @precio_estimado, @categoria)
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
                .query('SELECT * FROM Servicios');
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
                .query('SELECT * FROM Servicios WHERE servicio_id = @id');
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
                .query('SELECT * FROM Servicios WHERE categoria = @categoria');
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, servicio) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('nombre', mssql.VarChar(100), servicio.nombre)
                .input('descripcion', mssql.Text, servicio.descripcion)
                .input('duracion_estimada', mssql.Int, servicio.duracion_estimada)
                .input('precio_estimado', mssql.Decimal(10,2), servicio.precio_estimado)
                .input('categoria', mssql.VarChar(50), servicio.categoria)
                .query(`
                    UPDATE Servicios
                    SET nombre = @nombre,
                        descripcion = @descripcion,
                        duracion_estimada = @duracion_estimada,
                        precio_estimado = @precio_estimado,
                        categoria = @categoria
                    OUTPUT INSERTED.*
                    WHERE servicio_id = @id
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
                .query('DELETE FROM Servicios WHERE servicio_id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Servicio;