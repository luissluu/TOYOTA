// src/utils/validaciones.js

/**
 * Valida que el texto contenga solo letras y espacios
 * @param {string} texto - El texto a validar
 * @returns {boolean} - true si es válido, false si no
 */
export const validarSoloLetras = (texto) => {
  if (!texto) return true;
  const patron = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  return patron.test(texto);
};

/**
 * Valida que el texto sea un email válido
 * @param {string} email - El email a validar
 * @returns {boolean} - true si es válido, false si no
 */
export const validarEmail = (email) => {
  if (!email) return true;
  const patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return patron.test(email);
};

/**
 * Valida que el texto sea un número de teléfono válido (formato mexicano)
 * @param {string} telefono - El teléfono a validar 
 * @returns {boolean} - true si es válido, false si no
 */
export const validarTelefono = (telefono) => {
  if (!telefono) return true;
  // Elimina espacios, guiones y paréntesis
  const numeroLimpio = telefono.replace(/[\s\-()]/g, '');
  
  // Verifica que sea un número válido en formato mexicano (10 dígitos)
  // También acepta el formato con +52 o 52 al inicio
  const patron = /^(\+?52)?[1-9]\d{9}$/;
  return patron.test(numeroLimpio);
};

/**
 * Valida que el texto sea un número de VIN válido (Vehicle Identification Number)
 * @param {string} vin - El VIN a validar
 * @returns {boolean} - true si es válido, false si no
 */
export const validarVIN = (vin) => {
  if (!vin) return true;
  
  // Los VIN modernos tienen 17 caracteres, no usan I, O, Q y contienen solo letras y números
  const patron = /^[A-HJ-NPR-Z0-9]{17}$/i;
  return patron.test(vin);
};

/**
 * Valida la seguridad de una contraseña
 * Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número
 * @param {string} password - La contraseña a validar
 * @returns {boolean} - true si es válida, false si no
 */
export const validarPassword = (password) => {
  if (!password) return true;
  
  // Mínimo 8 caracteres, al menos una letra mayúscula, una minúscula y un número
  const patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return patron.test(password);
};

/**
 * Valida que dos contraseñas coincidan
 * @param {string} password - La contraseña principal
 * @param {string} confirmPassword - La confirmación de la contraseña
 * @returns {boolean} - true si coinciden, false si no
 */
export const validarPasswordsCoinciden = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Valida un número de tarjeta de crédito usando el algoritmo de Luhn
 * @param {string} numeroTarjeta - El número de tarjeta a validar
 * @returns {boolean} - true si es válido, false si no
 */
export const validarNumeroTarjeta = (numeroTarjeta) => {
  if (!numeroTarjeta) return true;
  
  // Eliminar espacios y guiones
  const numero = numeroTarjeta.replace(/[\s-]/g, '');
  
  // Verificar longitud
  if (!/^\d{13,19}$/.test(numero)) return false;
  
  // Algoritmo de Luhn
  let suma = 0;
  let doble = false;
  
  // Desde el último dígito hacia el primero
  for (let i = numero.length - 1; i >= 0; i--) {
    let digito = parseInt(numero.charAt(i), 10);
    
    if (doble) {
      digito *= 2;
      if (digito > 9) digito -= 9;
    }
    
    suma += digito;
    doble = !doble;
  }
  
  return (suma % 10) === 0;
};

/**
 * Formatea un número telefónico para que se muestre correctamente
 * @param {string} telefono - El número de teléfono a formatear
 * @returns {string} - El número formateado
 */
export const formatearTelefono = (telefono) => {
  // Elimina todo lo que no sea número
  const numeroLimpio = telefono.replace(/\D/g, '');
  
  // Si comienza con 52, lo quita
  const sinPrefijo = numeroLimpio.startsWith('52') 
    ? numeroLimpio.substring(2) 
    : numeroLimpio;
  
  // Formatea como: (123) 456-7890
  if (sinPrefijo.length === 10) {
    return `(${sinPrefijo.substring(0, 3)}) ${sinPrefijo.substring(3, 6)}-${sinPrefijo.substring(6, 10)}`;
  }
  
  return telefono; // Si no coincide con el formato esperado, devuelve el original
};

/**
 * Verifica si un campo es requerido y está vacío
 * @param {string} valor - El valor a validar
 * @returns {boolean} - true si está vacío, false si contiene algo
 */
export const campoRequerido = (valor) => {
  return valor === null || valor === undefined || valor.toString().trim() === '';
};