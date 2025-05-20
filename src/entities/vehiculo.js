const { getConnection, mssql } = require('../config/database');

class Vehiculo {
    static async create(vehiculo) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('placa', mssql.VarChar(20), vehiculo.placa)
                .input('marca', mssql.VarChar(50), vehiculo.marca)
                .input('modelo', mssql.VarChar(50), vehiculo.modelo)
                .input('año', mssql.Int, vehiculo.año)
                .input('color', mssql.VarChar(30), vehiculo.color)
                .input('vin', mssql.VarChar(50), vehiculo.vin)
                .input('kilometraje', mssql.Int, vehiculo.kilometraje)
                .query(`
                    INSERT INTO Vehiculos (placa, marca, modelo, año, color, vin, kilometraje)
                    OUTPUT INSERTED.*
                    VALUES (@placa, @marca, @modelo, @año, @color, @vin, @kilometraje)
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
                .query('SELECT * FROM Vehiculos');
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
                .query('SELECT * FROM Vehiculos WHERE vehiculo_id = @id');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByPlaca(placa) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('placa', mssql.VarChar(20), placa)
                .query('SELECT * FROM Vehiculos WHERE placa = @placa');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, vehiculo) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('placa', mssql.VarChar(20), vehiculo.placa)
                .input('marca', mssql.VarChar(50), vehiculo.marca)
                .input('modelo', mssql.VarChar(50), vehiculo.modelo)
                .input('año', mssql.Int, vehiculo.año)
                .input('color', mssql.VarChar(30), vehiculo.color)
                .input('vin', mssql.VarChar(50), vehiculo.vin)
                .input('kilometraje', mssql.Int, vehiculo.kilometraje)
                .query(`
                    UPDATE Vehiculos
                    SET placa = @placa,
                        marca = @marca,
                        modelo = @modelo,
                        año = @año,
                        color = @color,
                        vin = @vin,
                        kilometraje = @kilometraje
                    OUTPUT INSERTED.*
                    WHERE vehiculo_id = @id
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
                .query('DELETE FROM Vehiculos WHERE vehiculo_id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Vehiculo;