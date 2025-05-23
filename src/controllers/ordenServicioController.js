const OrdenServicio = require('../entities/OrdenServicio');
const DetalleOrden = require('../entities/DetalleOrden');
const Servicio = require('../entities/servicio');
const PDFDocument = require('pdfkit');
const path = require('path');
const { enviarCorreo } = require('../utils/email');

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

// Obtener una orden por ID
const getOrdenById = async (req, res) => {
    try {
        const { id } = req.params;
        const orden = await OrdenServicio.findById(id);
        if (!orden) {
            return res.status(404).json({ error: 'Orden de servicio no encontrada' });
        }
        // Agrega los detalles de la orden
        orden.detalles = await DetalleOrden.findByOrden(orden.orden_id);
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
        // Enviar correo al cliente
        if (ordenActual.email) {
            const nombreCliente = `${ordenActual.nombre_usuario || ''} ${ordenActual.apellido_usuario || ''}`.trim();
            const modeloAuto = `${ordenActual.marca_vehiculo || ''} ${ordenActual.modelo_vehiculo || ''}`.trim();
            const html = `
              <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 32px;">
                <div style="max-width: 500px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); overflow: hidden;">
                  <div style="background: linear-gradient(90deg, #EB0A1E 0%, #222 100%); padding: 24px 0; text-align: center;">
                    <img src="https://toyota-one.vercel.app/Logo.png" alt="Toyota" style="width: 80px; height: 80px; margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto;" />
                    <h1 style="color: #fff; margin: 0; font-size: 1.7rem;">Toyota Taller Mecánico</h1>
                  </div>
                  <div style="padding: 32px 24px 24px 24px; text-align: center;">
                    <h2 style="color: #EB0A1E; margin-bottom: 16px;">¡Tu auto está listo!</h2>
                    <p style="color: #333; font-size: 1.1rem; margin-bottom: 24px;">
                      Hola <b>${nombreCliente}</b>,<br>
                      Te informamos que tu auto <b>${modeloAuto}</b> ya está listo para ser recogido en nuestro taller.
                    </p>
                    <p style="color: #666; font-size: 1rem; margin-bottom: 24px;">
                      Si tienes dudas o necesitas más información, contáctanos.<br>
                      ¡Gracias por confiar en Toyota Taller!
                    </p>
                  </div>
                  <div style="background: #f4f4f4; color: #888; font-size: 0.9rem; padding: 16px; text-align: center; border-top: 1px solid #eee;">
                    &copy; ${new Date().getFullYear()} Toyota Taller Mecánico
                  </div>
                </div>
              </div>
            `;
            await enviarCorreo(ordenActual.email, '¡Tu auto está listo!', html);
        }
        res.json({ message: 'Orden finalizada correctamente', orden: ordenFinalizada });
    } catch (error) {
        console.error('Error al finalizar orden:', error);
        res.status(500).json({ error: 'Error al finalizar la orden' });
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
      const detalles = await DetalleOrden.findByOrden(id);
  
      // Crear el PDF con márgenes ajustados
      const doc = new PDFDocument({ 
        margin: 50,
        size: 'A4',
        info: {
          Title: `Orden de Servicio #${id}`,
          Author: 'Toyota Service Center'
        }
      });
  
      // Configurar headers para la descarga
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=orden-servicio-${id}.pdf`);
      doc.pipe(res);
  
      // Colores Toyota
      const toyotaRed = '#EB0A1E';
      const toyotaGray = '#58595B';
  
      // Logo
      const logoPath = path.join(__dirname, '../../src/public/Images/Logo.png');
      try {
        doc.image(logoPath, 50, 50, { width: 120 });
      } catch (e) {
        console.log('Logo no encontrado:', e);
      }
  
      // Encabezado con estilo Toyota
      doc.fontSize(24)
         .font('Helvetica-Bold')
         .fillColor(toyotaRed)
         .text('Orden de Servicio', 200, 60, { align: 'center' });
      
      doc.fontSize(14)
         .fillColor(toyotaGray)
         .text('Toyota Service Center', 200, 90, { align: 'center' });
      
         doc.fontSize(12)
         .fillColor('black')
         .text(`Folio: ${orden.orden_id}`, 450, 40); // O prueba con 40, 50, 90, etc.
  
      // Línea decorativa
      doc.moveTo(50, 120)
         .lineTo(545, 120)
         .strokeColor(toyotaRed)
         .lineWidth(2)
         .stroke();
  
      // Datos del vehículo
      doc.fontSize(14)
         .fillColor(toyotaRed)
         .font('Helvetica-Bold')
         .text('Datos del Vehículo', 50, 140);
  
      // Tabla de datos del vehículo
      const vehiculoData = [
        ['Marca:', orden.marca_vehiculo || ''],
        ['Modelo:', orden.modelo_vehiculo || ''],
        ['Placa:', orden.placa_vehiculo || ''],
        ['Color:', orden.color || ''],
        ['Kilometraje:', orden.kilometraje || ''],
        ['Año:', orden.anio || '']
      ];
  
      let y = 160;
      vehiculoData.forEach(([label, value]) => {
        doc.fontSize(10)
           .fillColor(toyotaGray)
           .font('Helvetica-Bold')
           .text(label, 50, y)
           .fillColor('black')
           .font('Helvetica')
           .text(value, 150, y);
        y += 20;
      });
  
      // Datos del cliente
      doc.fontSize(14)
         .fillColor(toyotaRed)
         .font('Helvetica-Bold')
         .text('Datos del Cliente', 300, 140);
  
      const clienteData = [
        ['Nombre:', `${orden.nombre_usuario || ''} ${orden.apellido_usuario || ''}`],
        ['Teléfono:', orden.telefono || ''],
        ['Email:', orden.email || '']
      ];
  
      y = 160;
      clienteData.forEach(([label, value]) => {
        doc.fontSize(10)
           .fillColor(toyotaGray)
           .font('Helvetica-Bold')
           .text(label, 300, y)
           .fillColor('black')
           .font('Helvetica')
           .text(value, 380, y);
        y += 20;
      });
  
      // Fechas
      doc.fontSize(14)
         .fillColor(toyotaRed)
         .font('Helvetica-Bold')
         .text('Fechas del Servicio', 50, 280);
  
      doc.fontSize(10)
         .fillColor(toyotaGray)
         .font('Helvetica-Bold')
         .text('Ingreso:', 50, 300)
         .fillColor('black')
         .font('Helvetica')
         .text(orden.fecha_inicio ? new Date(orden.fecha_inicio).toLocaleDateString() : '', 120, 300)
         .fillColor(toyotaGray)
         .font('Helvetica-Bold')
         .text('Salida:', 250, 300)
         .fillColor('black')
         .font('Helvetica')
         .text(orden.fecha_finalizacion ? new Date(orden.fecha_finalizacion).toLocaleDateString() : '', 320, 300);
  
      // Tabla de servicios
      doc.fontSize(14)
         .fillColor(toyotaRed)
         .font('Helvetica-Bold')
         .text('Servicios Realizados', 50, 340);
  
      // Encabezado de la tabla
      doc.fontSize(10)
         .fillColor('white')
         .font('Helvetica-Bold')
         .rect(30, 360, 555, 28)
         .fillAndStroke(toyotaRed, toyotaRed);
  
      doc.text('CANT', 40, 368, { width: 40, align: 'center' })
         .text('DESCRIPCIÓN DEL SERVICIO', 90, 368, { width: 270, align: 'left' })
         .text('COSTO', 370, 368, { width: 80, align: 'right' })
         .text('IMPORTE', 460, 368, { width: 80, align: 'right' });
  
      let yPos = 388;
      let total = 0;
  
      // Anchos de columnas
      const colWidths = [40, 270, 80, 80];
      const colX = [40, 90, 360, 440, 520]; // posiciones X de cada columna
  
      detalles.forEach((detalle, i) => {
        const descripcion = detalle.descripcion_servicio || detalle.nombre_servicio || '';
        const precio = `$${detalle.precio || detalle.costo || 0}`;
        const importe = `$${detalle.precio || detalle.costo || 0}`;
  
        // Calcula la altura necesaria para la descripción
        const descHeight = doc.heightOfString(descripcion, { width: colWidths[1] });
        const rowHeight = Math.max(descHeight, 20);
  
        // Fondo alterno
        const bgColor = i % 2 === 0 ? '#F5F5F5' : 'white';
        doc.rect(30, yPos, 555, rowHeight).fill(bgColor);
  
        // Bordes horizontales
        doc.moveTo(30, yPos).lineTo(585, yPos).strokeColor(toyotaGray).lineWidth(1).stroke();
        doc.moveTo(30, yPos + rowHeight).lineTo(585, yPos + rowHeight).strokeColor(toyotaGray).lineWidth(1).stroke();
  
        // Bordes verticales
        colX.forEach(x => {
          doc.moveTo(x, yPos).lineTo(x, yPos + rowHeight).strokeColor(toyotaGray).lineWidth(1).stroke();
        });
  
        // Centrado vertical para las celdas de una sola línea
        const singleLineHeight = doc.heightOfString('1', { width: colWidths[0] });
        const centerY = yPos + (rowHeight - singleLineHeight) / 2;
  
        // Cantidad
        doc.fontSize(12)
           .fillColor('black')
           .font('Helvetica')
           .text('1', colX[0], centerY, { width: colWidths[0], align: 'center' });
  
        // Descripción (con salto de línea, siempre arriba)
        doc.text(descripcion, colX[1], yPos + 4, { width: colWidths[1], align: 'left' });
  
        // Costo
        doc.text(precio, colX[2], centerY, { width: colWidths[2], align: 'right' });
  
        // Importe
        doc.text(importe, colX[3], centerY, { width: colWidths[3], align: 'right' });
  
        total += Number(detalle.precio || detalle.costo || 0);
        yPos += rowHeight;
      });
  
      // Total
      doc.rect(30, yPos, 555, 28)
         .fillAndStroke(toyotaRed, toyotaRed);
  
      doc.fontSize(14)
         .fillColor('white')
         .font('Helvetica-Bold')
         .text('TOTAL:', 370, yPos + 8, { width: 80, align: 'right' })
         .text(`$${total.toFixed(2)}`, 460, yPos + 8, { width: 80, align: 'right' });
  
      // Observaciones
      doc.fontSize(14)
         .fillColor(toyotaRed)
         .font('Helvetica-Bold')
         .text('Observaciones', 50, yPos + 40);
  
      doc.fontSize(12)
         .fillColor('black')
         .font('Helvetica')
         .text(orden.notas || 'N/A', 50, yPos + 60, { width: 495 });
  
      // Pie de página
      doc.fontSize(9)
         .fillColor(toyotaGray)
         .font('Helvetica')
         .text('Toyota Service Center - Av. Reforma #1234, Col. Juárez, Ciudad de México, C.P. 06600', 50, 780, { align: 'center', width: 495 })
         .text('Tel: 554412457812 | www.toyota.com.mx', 50, 795, { align: 'center', width: 495 });
  
      doc.end();
    } catch (error) {
      console.error('Error al generar PDF de la orden:', error);
      res.status(500).json({ error: 'Error al generar el PDF de la orden' });
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