const { getConnection } = require('../config/database');

const totalClientes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT COUNT(*) AS total FROM Usuarios');
    res.json({ total: result.recordset[0].total });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el total de clientes' });
  }
};

const serviciosCompletados = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT COUNT(*) AS completados
      FROM Ordenes_Servicio
      WHERE estado = 'finalizada' AND MONTH(fecha_creacion) = MONTH(GETDATE()) AND YEAR(fecha_creacion) = YEAR(GETDATE())
    `);
    res.json({ completados: result.recordset[0].completados });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios completados' });
  }
};

const serviciosPopulares = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT d.nombre_servicio, COUNT(*) AS cantidad
      FROM Detalles_Orden d
      JOIN Ordenes_Servicio o ON d.orden_id = o.orden_id
      WHERE MONTH(o.fecha_creacion) = MONTH(GETDATE()) AND YEAR(o.fecha_creacion) = YEAR(GETDATE())
      GROUP BY d.nombre_servicio
      ORDER BY cantidad DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios más populares' });
  }
};

const serviciosRecientes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT TOP 5 o.orden_id, o.fecha_creacion, u.nombre, u.apellidoPaterno, d.nombre_servicio, d.estado
      FROM Ordenes_Servicio o
      JOIN Usuarios u ON o.usuario_id = u.usuario_id
      JOIN Detalles_Orden d ON o.orden_id = d.orden_id
      ORDER BY o.fecha_creacion DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios recientes' });
  }
};

module.exports = {
  totalClientes,
  serviciosCompletados,
  serviciosPopulares,
  serviciosRecientes
}; 