const { getConnection, mssql } = require('../config/database');

class Usuario {
    static async create(usuario) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('rol_id', mssql.Int, usuario.rol_id)
                .input('nombre', mssql.VarChar(100), usuario.nombre)
                .input('apellidoPaterno', mssql.VarChar(100), usuario.apellidoPaterno)
                .input('apellidoMaterno', mssql.VarChar(100), usuario.apellidoMaterno)
                .input('correoElectronico', mssql.VarChar(100), usuario.correoElectronico)
                .input('contraseña', mssql.VarChar(255), usuario.contraseña)
                .input('telefono', mssql.VarChar(20), usuario.telefono)
                .input('direccion', mssql.VarChar(255), usuario.direccion)
                .input('ciudad', mssql.VarChar(100), usuario.ciudad)
                .input('fecha_nacimiento', mssql.Date, usuario.fecha_nacimiento)
                .input('estado_provincia', mssql.VarChar(100), usuario.estado_provincia)
                .input('codigo_postal', mssql.VarChar(20), usuario.codigo_postal)
                .query(`
                    INSERT INTO Usuarios (
                        rol_id, nombre, apellidoPaterno, apellidoMaterno, 
                        correoElectronico, contraseña, telefono, direccion, 
                        ciudad, estado_provincia, codigo_postal, fecha_nacimiento
                    )
                    VALUES (
                        @rol_id, @nombre, @apellidoPaterno, @apellidoMaterno, 
                        @correoElectronico, @contraseña, @telefono, @direccion, 
                        @ciudad, @estado_provincia, @codigo_postal, @fecha_nacimiento
                    );
                    SELECT SCOPE_IDENTITY() AS usuario_id;
                `);
            
            // Obtener el ID del usuario recién creado
            const usuarioId = result.recordset[0].usuario_id;
            
            // Obtener el usuario completo
            const usuarioCreado = await this.findById(usuarioId);
            return usuarioCreado;
            
        } catch (error) {
            if (error.message.includes('UNIQUE KEY constraint')) {
                throw new Error('El correo electrónico ya está registrado');
            }
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request().query(`
                SELECT u.*, r.tipo_rol 
                FROM Usuarios u
                INNER JOIN Roles r ON u.rol_id = r.rol_id
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
                    SELECT u.*, r.tipo_rol 
                    FROM Usuarios u
                    INNER JOIN Roles r ON u.rol_id = r.rol_id
                    WHERE u.usuario_id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('email', mssql.VarChar(100), email)
                .query(`
                    SELECT u.*, r.tipo_rol 
                    FROM Usuarios u
                    INNER JOIN Roles r ON u.rol_id = r.rol_id
                    WHERE u.correoElectronico = @email
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, usuario) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('rol_id', mssql.Int, usuario.rol_id)
                .input('nombre', mssql.VarChar(100), usuario.nombre)
                .input('apellidoPaterno', mssql.VarChar(100), usuario.apellidoPaterno)
                .input('apellidoMaterno', mssql.VarChar(100), usuario.apellidoMaterno)
                .input('telefono', mssql.VarChar(20), usuario.telefono)
                .input('direccion', mssql.VarChar(255), usuario.direccion)
                .input('ciudad', mssql.VarChar(100), usuario.ciudad)
                .input('estado_provincia', mssql.VarChar(100), usuario.estado_provincia)
                .input('codigo_postal', mssql.VarChar(20), usuario.codigo_postal)
                .query(`
                    UPDATE Usuarios
                    SET rol_id = @rol_id,
                        nombre = @nombre,
                        apellidoPaterno = @apellidoPaterno,
                        apellidoMaterno = @apellidoMaterno,
                        telefono = @telefono,
                        direccion = @direccion,
                        ciudad = @ciudad,
                        estado_provincia = @estado_provincia,
                        codigo_postal = @codigo_postal,
                        ultimo_acceso = GETDATE()
                    OUTPUT INSERTED.*
                    WHERE usuario_id = @id
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
                .query('DELETE FROM Usuarios WHERE usuario_id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }

    static async updateLastAccess(id) {
        try {
            const pool = await getConnection();
            await pool.request()
                .input('id', mssql.Int, id)
                .query('UPDATE Usuarios SET ultimo_acceso = GETDATE() WHERE usuario_id = @id');
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async findByRol(tipo_rol) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('tipo_rol', mssql.VarChar(50), tipo_rol)
                .query(`
                    SELECT u.*, r.tipo_rol 
                    FROM Usuarios u
                    INNER JOIN Roles r ON u.rol_id = r.rol_id
                    WHERE r.tipo_rol = @tipo_rol
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findByRolId(rol_id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('rol_id', mssql.Int, rol_id)
                .query(`
                    SELECT u.*, r.tipo_rol 
                    FROM Usuarios u
                    INNER JOIN Roles r ON u.rol_id = r.rol_id
                    WHERE u.rol_id = @rol_id
                `);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Usuario;