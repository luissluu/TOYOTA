const { getConnection, mssql } = require('../config/database.js');

class Rol {
    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .query('SELECT * FROM Roles');
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
                .query('SELECT * FROM Roles WHERE rol_id = @id');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Rol;