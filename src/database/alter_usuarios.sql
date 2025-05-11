-- Agregar columnas para recuperación de contraseña
ALTER TABLE Usuarios
ADD reset_token VARCHAR(255) NULL,
    reset_token_expiry DATETIME NULL; 