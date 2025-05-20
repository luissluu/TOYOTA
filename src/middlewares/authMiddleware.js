const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  // Obtener el token del header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado' });
  }
  
  try {
    // Verificar el token
    const secretKey = process.env.JWT_SECRET || 'claveSecretaPorDefecto';
    const decoded = jwt.verify(token, secretKey);
    
    // Añadir el usuario decodificado a la request
    req.usuario = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// Middleware para verificar roles
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ message: 'Acceso denegado' });
    }
    
    const rolUsuario = req.usuario.rol;
    
    if (!roles.includes(rolUsuario)) {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
    
    next();
  };
};

module.exports = {
  authMiddleware,
  checkRole
};