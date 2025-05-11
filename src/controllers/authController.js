const { getConnection, mssql } = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

dotenv.config();

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

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

// Solicitar recuperación de contraseña
const forgotPassword = async (req, res) => {
    try {
        const { correoElectronico } = req.body;
        const pool = await getConnection();

        // Verificar si el usuario existe
        const result = await pool
            .request()
            .input("correoElectronico", mssql.VarChar, correoElectronico)
            .query("SELECT usuario_id FROM Usuarios WHERE correoElectronico = @correoElectronico");

        const usuario = result.recordset[0];

        if (!usuario) {
            return res.status(404).json({ message: "No existe una cuenta con este correo electrónico" });
        }

        // Generar token de recuperación
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // Token válido por 1 hora

        // Guardar el token en la base de datos
        await pool
            .request()
            .input("usuario_id", mssql.Int, usuario.usuario_id)
            .input("resetToken", mssql.VarChar, resetToken)
            .input("resetTokenExpiry", mssql.DateTime, resetTokenExpiry)
            .query(`
                UPDATE Usuarios 
                SET reset_token = @resetToken, 
                    reset_token_expiry = @resetTokenExpiry 
                WHERE usuario_id = @usuario_id
            `);

        // Crear el enlace de recuperación
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Configurar el correo electrónico con mejor estilo y logo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: correoElectronico,
            subject: 'Recuperación de Contraseña - Toyota Taller Mecánico',
            html: `
                <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 32px;">
                  <div style="max-width: 500px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #EB0A1E 0%, #222 100%); padding: 24px 0; text-align: center;">
                      <img src="https://toyota-one.vercel.app/Logo.png" alt="Toyota" style="width: 80px; height: 80px; margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto;" />
                      <h1 style="color: #fff; margin: 0; font-size: 1.7rem;">Toyota Taller Mecánico</h1>
                    </div>
                    <div style="padding: 32px 24px 24px 24px; text-align: center;">
                      <h2 style="color: #EB0A1E; margin-bottom: 16px;">Recuperación de Contraseña</h2>
                      <p style="color: #333; font-size: 1.1rem; margin-bottom: 24px;">
                        Has solicitado restablecer tu contraseña. Haz clic en el siguiente botón para crear una nueva contraseña:
                      </p>
                      <div style="text-align: center; margin-bottom: 24px;">
                        <a href="${resetUrl}" style="display: inline-block; background: #EB0A1E; color: #fff; padding: 14px 32px; border-radius: 6px; font-size: 1.1rem; text-decoration: none; font-weight: bold;">
                          Restablecer Contraseña
                        </a>
                      </div>
                      <p style="color: #666; font-size: 0.95rem; margin-top: 24px;">
                        Este enlace expirará en 1 hora.<br>Si no solicitaste este cambio, puedes ignorar este correo.
                      </p>
                    </div>
                    <div style="background: #f4f4f4; color: #888; font-size: 0.9rem; padding: 16px; text-align: center; border-top: 1px solid #eee;">
                      &copy; ${new Date().getFullYear()} Toyota Taller Mecánico
                    </div>
                  </div>
                </div>
            `
        };

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);

        res.json({ message: "Se ha enviado un correo con las instrucciones para recuperar tu contraseña" });
    } catch (error) {
        console.error("Error en forgotPassword:", error);
        res.status(500).json({ message: "Error al procesar la solicitud de recuperación de contraseña" });
    }
};

// Restablecer contraseña
const resetPassword = async (req, res) => {
    try {
        const { token, nuevaContraseña } = req.body;
        const pool = await getConnection();

        // Buscar usuario con el token válido
        const result = await pool
            .request()
            .input("token", mssql.VarChar, token)
            .input("now", mssql.DateTime, new Date())
            .query(`
                SELECT usuario_id 
                FROM Usuarios 
                WHERE reset_token = @token 
                AND reset_token_expiry > @now
            `);

        const usuario = result.recordset[0];

        if (!usuario) {
            return res.status(400).json({ 
                message: "El token de recuperación es inválido o ha expirado" 
            });
        }

        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(nuevaContraseña, salt);

        // Actualizar la contraseña y limpiar los tokens
        await pool
            .request()
            .input("usuario_id", mssql.Int, usuario.usuario_id)
            .input("hashedPassword", mssql.VarChar, hashedPassword)
            .query(`
                UPDATE Usuarios 
                SET contraseña = @hashedPassword,
                    reset_token = NULL,
                    reset_token_expiry = NULL
                WHERE usuario_id = @usuario_id
            `);

        res.json({ message: "Contraseña actualizada exitosamente" });
    } catch (error) {
        console.error("Error en resetPassword:", error);
        res.status(500).json({ message: "Error al restablecer la contraseña" });
    }
};

// Verificar contraseña actual
const verifyPassword = async (req, res) => {
    try {
        if (!req.usuario || !req.usuario.id) {
            return res.status(401).json({ message: 'No autorizado: token inválido o no enviado' });
        }
        const { currentPassword } = req.body;
        const usuario_id = req.usuario.id;
        const pool = await getConnection();
        
        // Obtener la contraseña actual del usuario
        const result = await pool
            .request()
            .input("usuario_id", mssql.Int, usuario_id)
            .query("SELECT contraseña FROM Usuarios WHERE usuario_id = @usuario_id");

        const usuario = result.recordset[0];

        if (!usuario) {
            return res.status(404).json({ 
                success: false,
                message: "Usuario no encontrado" 
            });
        }

        // Verificar la contraseña
        console.log('currentPassword:', currentPassword, typeof currentPassword);
        console.log('usuario.contraseña:', usuario.contraseña, typeof usuario.contraseña);
        if (typeof currentPassword !== 'string' || typeof usuario.contraseña !== 'string') {
            return res.status(400).json({ message: 'Error interno: datos de contraseña inválidos' });
        }
        const validPassword = await bcrypt.compare(currentPassword, usuario.contraseña);
        
        if (!validPassword) {
            return res.status(401).json({ 
                success: false,
                message: "Contraseña incorrecta" 
            });
        }

        res.json({ 
            success: true,
            message: "Contraseña verificada correctamente" 
        });
    } catch (error) {
        console.error("Error en verifyPassword:", error);
        res.status(500).json({ 
            success: false,
            message: "Error al verificar la contraseña" 
        });
    }
};

// Cambiar contraseña
const changePassword = async (req, res) => {
    try {
        if (!req.usuario || !req.usuario.id) {
            return res.status(401).json({ message: 'No autorizado: token inválido o no enviado' });
        }
        const { currentPassword, newPassword } = req.body;
        const usuario_id = req.usuario.id;
        const pool = await getConnection();
        
        // Obtener la contraseña actual del usuario
        const result = await pool
            .request()
            .input("usuario_id", mssql.Int, usuario_id)
            .query("SELECT contraseña FROM Usuarios WHERE usuario_id = @usuario_id");

        const usuario = result.recordset[0];

        if (!usuario) {
            return res.status(404).json({ 
                success: false,
                message: "Usuario no encontrado" 
            });
        }

        // Verificar la contraseña actual
        const validPassword = await bcrypt.compare(currentPassword, usuario.contraseña);
        
        if (!validPassword) {
            return res.status(401).json({ 
                success: false,
                message: "Contraseña actual incorrecta" 
            });
        }

        // Encriptar la nueva contraseña
        console.log('newPassword:', newPassword, typeof newPassword);
        if (typeof newPassword !== 'string' || newPassword.length < 8) {
            return res.status(400).json({ message: 'La nueva contraseña es inválida o demasiado corta' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Actualizar la contraseña
        await pool
            .request()
            .input("usuario_id", mssql.Int, usuario_id)
            .input("hashedPassword", mssql.VarChar, hashedPassword)
            .query("UPDATE Usuarios SET contraseña = @hashedPassword WHERE usuario_id = @usuario_id");

        res.json({ 
            success: true,
            message: "Contraseña actualizada exitosamente" 
        });
    } catch (error) {
        console.error("Error en changePassword:", error);
        res.status(500).json({ 
            success: false,
            message: "Error al cambiar la contraseña" 
        });
    }
};

module.exports = {
    login,
    forgotPassword,
    resetPassword,
    verifyPassword,
    changePassword
};