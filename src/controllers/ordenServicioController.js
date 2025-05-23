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
      const logoPath = path.join(__dirname, '../../public/Images/Logo.png');
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
         .text(`Folio: ${orden.orden_id}`, 450, 60);
  
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
         .rect(50, 360, 495, 20)
         .fillAndStroke(toyotaRed, toyotaRed);
  
      doc.text('CANT', 60, 365, { width: 40 })
         .text('DESCRIPCIÓN DEL SERVICIO', 110, 365, { width: 250 })
         .text('COSTO', 370, 365, { width: 80 })
         .text('IMPORTE', 450, 365, { width: 80 });
  
      // Contenido de la tabla
      let yPos = 380;
      let total = 0;
  
      detalles.forEach((detalle, i) => {
        const bgColor = i % 2 === 0 ? '#F5F5F5' : 'white';
        
        doc.rect(50, yPos, 495, 20)
           .fillAndStroke(bgColor, toyotaGray);
  
        doc.fontSize(10)
           .fillColor('black')
           .font('Helvetica')
           .text('1', 60, yPos + 5, { width: 40 })
           .text(detalle.descripcion_servicio || detalle.nombre_servicio || '', 110, yPos + 5, { width: 250 })
           .text(`$${detalle.precio || detalle.costo || 0}`, 370, yPos + 5, { width: 80 })
           .text(`$${detalle.precio || detalle.costo || 0}`, 450, yPos + 5, { width: 80 });
  
        total += Number(detalle.precio || detalle.costo || 0);
        yPos += 20;
      });
  
      // Total
      doc.rect(50, yPos, 495, 25)
         .fillAndStroke(toyotaRed, toyotaRed);
  
      doc.fontSize(12)
         .fillColor('white')
         .font('Helvetica-Bold')
         .text('TOTAL:', 370, yPos + 5)
         .text(`$${total.toFixed(2)}`, 450, yPos + 5);
  
      // Observaciones
      doc.fontSize(14)
         .fillColor(toyotaRed)
         .font('Helvetica-Bold')
         .text('Observaciones', 50, yPos + 40);
  
      doc.fontSize(10)
         .fillColor('black')
         .font('Helvetica')
         .text(orden.notas || 'N/A', 50, yPos + 60, { width: 495 });
  
      // Firmas
      const firmaY = yPos + 120;
      doc.fontSize(10)
         .fillColor(toyotaGray)
         .font('Helvetica-Bold')
         .text('Firma del Prestador del Servicio', 100, firmaY)
         .text('Firma del Cliente', 350, firmaY);
  
      doc.moveTo(100, firmaY + 20)
         .lineTo(250, firmaY + 20)
         .strokeColor(toyotaGray)
         .lineWidth(1)
         .stroke();
  
      doc.moveTo(350, firmaY + 20)
         .lineTo(500, firmaY + 20)
         .strokeColor(toyotaGray)
         .lineWidth(1)
         .stroke();
  
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