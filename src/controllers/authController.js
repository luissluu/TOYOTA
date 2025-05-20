const { getConnection, mssql } = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Iniciar sesión
const login = async (req, res) => {
  try {
    const { correoElectronico, contraseña } = req.body;
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("correoElectronico", mssql.VarChar, correoElectronico)
      .query(`
        SELECT u.*, r.tipo_rol 
        FROM Usuarios u
        JOIN Roles r ON u.rol_id = r.rol_id
        WHERE u.correoElectronico = @correoElectronico
      `);

    const usuario = result.recordset[0];

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const payload = {
      id: usuario.usuario_id,
      nombre: usuario.nombre,
      apellidoPaterno: usuario.apellidoPaterno,
      apellidoMaterno: usuario.apellidoMaterno,
      correoElectronico: usuario.correoElectronico,
      rol: usuario.tipo_rol,
    };

    const secretKey = process.env.JWT_SECRET || "claveSecretaPorDefecto";
    const token = jwt.sign(payload, secretKey, {
      expiresIn: process.env.JWT_EXPIRATION || "1d",
    });

    // Actualizar último acceso
    await pool
      .request()
      .input("usuario_id", mssql.Int, usuario.usuario_id)
      .query("UPDATE Usuarios SET ultimo_acceso = GETDATE() WHERE usuario_id = @usuario_id");

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario.usuario_id,
        nombre: usuario.nombre,
        apellidoPaterno: usuario.apellidoPaterno,
        apellidoMaterno: usuario.apellidoMaterno,
        correoElectronico: usuario.correoElectronico,
        rol: usuario.tipo_rol,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  login
};