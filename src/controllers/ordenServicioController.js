const OrdenServicio = require('../entities/OrdenServicio');
const DetalleOrden = require('../entities/DetalleOrden');
const Servicio = require('../entities/servicio');
const PDFDocument = require('pdfkit');
const path = require('path');

// Obtener todas las órdenes de servicio
const getAllOrdenes = async (req, res) => {
    try {
        const ordenes = await OrdenServicio.findAll();
        res.json(ordenes);
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        res.status(500).json({ error: 'Error al obtener las órdenes de servicio' });
    }
};
// Exportar PDF de una orden de servicio
const exportarPDFOrden = async (req, res) => {
    try {
      const { id } = req.params;
      const orden = await OrdenServicio.findById(id);
      if (!orden) {
        return res.status(404).json({ error: 'Orden de servicio no encontrada' });
      }
      // Obtener detalles de la orden
      const detalles = await DetalleOrden.findByOrden(id);
  
      // Crear el PDF
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=orden-servicio-${id}.pdf`);
      doc.pipe(res);
  
      // Logo
      const logoPath = path.join(__dirname, '../../public/Images/Logo.png');
      try {
        doc.image(logoPath, 40, 30, { width: 90 });
      } catch (e) {
        // Si no se encuentra el logo, continuar sin error
      }
  
      // Encabezado
      doc.fontSize(18).font('Helvetica-Bold').text('Orden de Servicio', 150, 40, { align: 'center' });
      doc.fontSize(12).font('Helvetica').text('Taller Mecánico', 150, 65, { align: 'center' });
      doc.fontSize(10).text(`Folio: ${orden.orden_id}`, 450, 40);
      doc.moveDown(2);
  
      // Datos del vehículo y cliente
      doc.fontSize(12).font('Helvetica-Bold').text('Datos del Vehículo', 40, 110);
      doc.fontSize(10).font('Helvetica').text(`Marca: ${orden.marca_vehiculo || ''}`, 40, 130);
      doc.text(`Modelo: ${orden.modelo_vehiculo || ''}`, 200, 130);
      doc.text(`Placa: ${orden.placa_vehiculo || ''}`, 360, 130);
      doc.text(`Color: ${orden.color || ''}`, 40, 145);
      doc.text(`Kilometraje: ${orden.kilometraje || ''}`, 200, 145);
      doc.text(`Año: ${orden.anio || ''}`, 360, 145);
      doc.moveDown();
      doc.font('Helvetica-Bold').text('Datos del Cliente', 40, 170);
      doc.font('Helvetica').fontSize(10).text(`Nombre: ${orden.nombre_usuario || ''} ${orden.apellido_usuario || ''}`, 40, 190);
      doc.text(`Teléfono: ${orden.telefono || ''}`, 300, 190);
      doc.text(`Email: ${orden.email || ''}`, 40, 205);
      doc.moveDown(2);
  
      // Fechas
      doc.font('Helvetica-Bold').text('Ingreso:', 40, 230);
      doc.font('Helvetica').text(orden.fecha_inicio ? new Date(orden.fecha_inicio).toLocaleDateString() : '', 100, 230);
      doc.font('Helvetica-Bold').text('Salida:', 200, 230);
      doc.font('Helvetica').text(orden.fecha_finalizacion ? new Date(orden.fecha_finalizacion).toLocaleDateString() : '', 250, 230);
      doc.moveDown(2);
  
      // Tabla de servicios
      doc.font('Helvetica-Bold').fontSize(12).text('Trabajos Realizados', 40, 260);
      doc.moveTo(40, 275).lineTo(550, 275).stroke();
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('CANT', 40, 280, { width: 40 });
      doc.text('DESCRIPCIÓN DEL TRABAJO', 90, 280, { width: 250 });
      doc.text('COSTO', 350, 280, { width: 80 });
      doc.text('IMPORTE', 430, 280, { width: 80 });
      doc.moveTo(40, 295).lineTo(550, 295).stroke();
      doc.font('Helvetica').fontSize(10);
      let y = 300;
      let total = 0;
      detalles.forEach((detalle, i) => {
        doc.text('1', 40, y, { width: 40 });
        doc.text(detalle.descripcion_servicio || detalle.nombre_servicio || '', 90, y, { width: 250 });
        doc.text(`$${detalle.precio || detalle.costo || 0}`, 350, y, { width: 80 });
        doc.text(`$${detalle.precio || detalle.costo || 0}`, 430, y, { width: 80 });
        total += Number(detalle.precio || detalle.costo || 0);
        y += 18;
      });
      doc.moveTo(40, y).lineTo(550, y).stroke();
      doc.font('Helvetica-Bold').text('TOTAL:', 350, y + 5);
      doc.font('Helvetica').text(`$${total}`, 430, y + 5);
      y += 30;
  
      // Observaciones
      doc.font('Helvetica-Bold').fontSize(12).text('Observaciones', 40, y);
      doc.font('Helvetica').fontSize(10).text(orden.notas || 'N/A', 40, y + 18, { width: 500 });
      y += 50;
  
      // Firmas
      doc.font('Helvetica-Bold').fontSize(10).text('Firma del Prestador del Servicio', 60, y + 40);
      doc.font('Helvetica-Bold').fontSize(10).text('Firma del Consumidor', 350, y + 40);
      doc.moveTo(60, y + 70).lineTo(220, y + 70).stroke();
      doc.moveTo(350, y + 70).lineTo(510, y + 70).stroke();
  
      // Pie de página
      doc.font('Helvetica').fontSize(9).text('Av. Reforma #1234, Col. Juárez, Ciudad de México, C.P. 06600. Tel: 554412457812', 40, 780, { align: 'center', width: 520 });
      doc.end();
    } catch (error) {
      console.error('Error al generar PDF de la orden:', error);
      res.status(500).json({ error: 'Error al generar el PDF de la orden' });
    }
  };
  

// Obtener una orden por ID
const getOrdenById = async (req, res) => {
    try {
        const { id } = req.params;
        const orden = await OrdenServicio.findById(id);
        
        if (!orden) {
            return res.status(404).json({ error: 'Orden de servicio no encontrada' });
        }
        
        res.json(orden);
    } catch (error) {
        console.error('Error al obtener orden:', error);
        res.status(500).json({ error: 'Error al obtener la orden de servicio' });
    }
};

// Obtener órdenes por usuario
const getOrdenesByUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const ordenes = await OrdenServicio.findByUsuario(usuarioId);
        // Agregar los detalles (servicios) a cada orden
        for (const orden of ordenes) {
            orden.detalles = await DetalleOrden.findByOrden(orden.orden_id);
        }
        res.json(ordenes);
    } catch (error) {
        console.error('Error al obtener órdenes del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las órdenes del usuario' });
    }
};

// Obtener órdenes por vehículo
const getOrdenesByVehiculo = async (req, res) => {
    try {
        const { vehiculoId } = req.params;
        const ordenes = await OrdenServicio.findByVehiculo(vehiculoId);
        res.json(ordenes);
    } catch (error) {
        console.error('Error al obtener órdenes del vehículo:', error);
        res.status(500).json({ error: 'Error al obtener las órdenes del vehículo' });
    }
};

// Obtener órdenes por estado
const getOrdenesByEstado = async (req, res) => {
    try {
        const { estado } = req.params;
        const ordenes = await OrdenServicio.findByEstado(estado);
        res.json(ordenes);
    } catch (error) {
        console.error('Error al obtener órdenes por estado:', error);
        res.status(500).json({ error: 'Error al obtener las órdenes por estado' });
    }
};

// Crear una nueva orden de servicio
const createOrden = async (req, res) => {
    try {
        // Crear la orden principal
        const { servicios, ...ordenData } = req.body;
        const orden = await OrdenServicio.create(ordenData);
        // Crear los detalles de la orden para cada servicio
        if (Array.isArray(servicios)) {
            for (const s of servicios) {
                // Obtener el precio del servicio
                const servicio = await Servicio.findById(s.id);
                const precio = servicio ? servicio.precio_estimado : 0;
                await DetalleOrden.create({
                    orden_id: orden.orden_id,
                    servicio_id: s.id,
                    mecanico_id: s.mecanico_id || null,
                    estado: 'pendiente',
                    descripcion: '',
                    precio: precio,
                    notas: ''
                });
            }
        }
        res.status(201).json(orden);
    } catch (error) {
        console.error('Error al crear orden:', error);
        if (error.message === 'El usuario, vehículo o cita especificada no existe') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al crear la orden de servicio' });
    }
};

// Actualizar una orden de servicio
const updateOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const orden = await OrdenServicio.update(id, req.body);
        
        if (!orden) {
            return res.status(404).json({ error: 'Orden de servicio no encontrada' });
        }
        
        res.json(orden);
    } catch (error) {
        console.error('Error al actualizar orden:', error);
        res.status(500).json({ error: 'Error al actualizar la orden de servicio' });
    }
};

// Actualizar estado de una orden
const updateEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        
        if (!estado) {
            return res.status(400).json({ error: 'El estado es requerido' });
        }
        
        const orden = await OrdenServicio.updateEstado(id, estado);
        
        if (!orden) {
            return res.status(404).json({ error: 'Orden de servicio no encontrada' });
        }
        
        res.json(orden);
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        res.status(500).json({ error: 'Error al actualizar el estado de la orden' });
    }
};

// Actualizar total de una orden
const updateTotal = async (req, res) => {
    try {
        const { id } = req.params;
        const { total } = req.body;
        
        if (total === undefined) {
            return res.status(400).json({ error: 'El total es requerido' });
        }
        
        const orden = await OrdenServicio.updateTotal(id, total);
        
        if (!orden) {
            return res.status(404).json({ error: 'Orden de servicio no encontrada' });
        }
        
        res.json(orden);
    } catch (error) {
        console.error('Error al actualizar total:', error);
        res.status(500).json({ error: 'Error al actualizar el total de la orden' });
    }
};

// Eliminar una orden de servicio
const deleteOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await OrdenServicio.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Orden de servicio no encontrada' });
        }
        
        res.json({ message: 'Orden de servicio eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar orden:', error);
        res.status(500).json({ error: 'Error al eliminar la orden de servicio' });
    }
};

// Finalizar una orden
const finalizarOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario_id } = req.body; // usuario que finaliza la orden
        // Obtener todos los detalles de la orden
        const detalles = await DetalleOrden.findByOrden(id);
        if (!detalles.length) {
            return res.status(400).json({ error: 'La orden no tiene servicios asociados' });
        }
        // Verificar que todos los detalles estén completados
        const incompletos = detalles.filter(d => d.estado !== 'completado');
        if (incompletos.length > 0) {
            return res.status(400).json({ error: 'No todos los servicios están completados' });
        }
        // Obtener la orden actual para conservar el total
        const ordenActual = await OrdenServicio.findById(id);
        // Si la orden tiene cita asociada, actualizar el estado de la cita a 'finalizada'
        if (ordenActual.cita_id) {
            const pool = await require('../config/database').getConnection();
            await pool.request()
                .input('cita_id', require('mssql').Int, ordenActual.cita_id)
                .input('estado', require('mssql').VarChar(20), 'finalizada')
                .query('UPDATE Citas SET estado = @estado WHERE cita_id = @cita_id');
        }
        // Finalizar la orden
        const ordenFinalizada = await OrdenServicio.update(id, {
            estado: 'finalizada',
            fecha_finalizacion: new Date(),
            finalizada_por: usuario_id,
            total: ordenActual.total,
            fecha_inicio: ordenActual.fecha_inicio,
            diagnostico: ordenActual.diagnostico,
            notas: ordenActual.notas,
            cita_id: null
        });
        res.json({ message: 'Orden finalizada correctamente', orden: ordenFinalizada });
    } catch (error) {
        console.error('Error al finalizar orden:', error);
        res.status(500).json({ error: 'Error al finalizar la orden' });
    }
};

module.exports = {
    getAllOrdenes,
    getOrdenById,
    getOrdenesByUsuario,
    getOrdenesByVehiculo,
    getOrdenesByEstado,
    createOrden,
    updateOrden,
    updateEstado,
    updateTotal,
    deleteOrden,
    finalizarOrden,
    exportarPDFOrden
}; 