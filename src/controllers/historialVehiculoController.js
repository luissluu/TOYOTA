const HistorialVehiculo = require('../entities/HistorialVehiculo');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

// Obtener todo el historial
const getAllHistorial = async (req, res) => {
    try {
        const historial = await HistorialVehiculo.findAll();
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener historial:', error);
        res.status(500).json({ error: 'Error al obtener el historial de vehículos' });
    }
};

// Obtener un registro del historial por ID
const getHistorialById = async (req, res) => {
    try {
        const { id } = req.params;
        const historial = await HistorialVehiculo.findById(id);
        
        if (!historial) {
            return res.status(404).json({ error: 'Registro de historial no encontrado' });
        }
        
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener registro de historial:', error);
        res.status(500).json({ error: 'Error al obtener el registro de historial' });
    }
};

// Obtener historial por vehículo
const getHistorialByVehiculo = async (req, res) => {
    try {
        const { vehiculoId } = req.params;
        const historial = await HistorialVehiculo.findByVehiculo(vehiculoId);
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener historial del vehículo:', error);
        res.status(500).json({ error: 'Error al obtener el historial del vehículo' });
    }
};

// Obtener historial por orden
const getHistorialByOrden = async (req, res) => {
    try {
        const { ordenId } = req.params;
        const historial = await HistorialVehiculo.findByOrden(ordenId);
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener historial de la orden:', error);
        res.status(500).json({ error: 'Error al obtener el historial de la orden' });
    }
};

// Obtener historial por mecánico
const getHistorialByMecanico = async (req, res) => {
    try {
        const { mecanicoId } = req.params;
        const historial = await HistorialVehiculo.findByMecanico(mecanicoId);
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener historial del mecánico:', error);
        res.status(500).json({ error: 'Error al obtener el historial del mecánico' });
    }
};

// Obtener historial por rango de fechas
const getHistorialByFecha = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ error: 'Se requieren las fechas de inicio y fin' });
        }
        
        const historial = await HistorialVehiculo.findByFecha(fechaInicio, fechaFin);
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener historial por fecha:', error);
        res.status(500).json({ error: 'Error al obtener el historial por fecha' });
    }
};

// Crear un nuevo registro en el historial
const createHistorial = async (req, res) => {
    try {
        const historial = await HistorialVehiculo.create(req.body);
        res.status(201).json(historial);
    } catch (error) {
        console.error('Error al crear registro de historial:', error);
        if (error.message === 'El vehículo, orden o usuario especificado no existe') {
            return res.status(400).json({ error: error.message });
        }
        if (error.message === 'El mecánico especificado no existe' || 
            error.message === 'El usuario especificado no es un mecánico') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al crear el registro de historial' });
    }
};

// Actualizar un registro del historial
const updateHistorial = async (req, res) => {
    try {
        const { id } = req.params;
        const historial = await HistorialVehiculo.update(id, req.body);
        
        if (!historial) {
            return res.status(404).json({ error: 'Registro de historial no encontrado' });
        }
        
        res.json(historial);
    } catch (error) {
        console.error('Error al actualizar registro de historial:', error);
        if (error.message === 'El mecánico especificado no existe' || 
            error.message === 'El usuario especificado no es un mecánico') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al actualizar el registro de historial' });
    }
};

// Eliminar un registro del historial
const deleteHistorial = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await HistorialVehiculo.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Registro de historial no encontrado' });
        }
        
        res.json({ message: 'Registro de historial eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar registro de historial:', error);
        res.status(500).json({ error: 'Error al eliminar el registro de historial' });
    }
};

// Exportar PDF de un servicio
const exportarPDF = async (req, res) => {
    try {
        const { id } = req.params;
        const historial = await HistorialVehiculo.findById(id);
        
        if (!historial) {
            return res.status(404).json({ error: 'Registro de historial no encontrado' });
        }

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=servicio-${id}.pdf`);
        
        doc.pipe(res);

        // Título
        doc.fontSize(20).text('Detalles del Servicio', { align: 'center' });
        doc.moveDown();

        // Información del servicio
        doc.fontSize(12).text(`ID del Servicio: ${historial.historial_id}`);
        doc.text(`Fecha: ${new Date(historial.fecha).toLocaleDateString()}`);
        doc.text(`Tipo de Servicio: ${historial.tipo_servicio}`);
        doc.text(`Descripción: ${historial.descripcion}`);
        doc.text(`Kilometraje: ${historial.kilometraje}`);
        doc.text(`Observaciones: ${historial.observaciones}`);
        doc.moveDown();

        // Información del vehículo
        doc.fontSize(14).text('Información del Vehículo');
        doc.fontSize(12).text(`Marca: ${historial.marca}`);
        doc.text(`Modelo: ${historial.modelo}`);
        doc.text(`Placa: ${historial.placa}`);
        doc.moveDown();

        // Información del cliente
        doc.fontSize(14).text('Información del Cliente');
        doc.fontSize(12).text(`Nombre: ${historial.nombre_usuario} ${historial.apellido_usuario}`);
        doc.moveDown();

        // Información del mecánico
        if (historial.nombre_mecanico) {
            doc.fontSize(14).text('Información del Mecánico');
            doc.fontSize(12).text(`Nombre: ${historial.nombre_mecanico} ${historial.apellido_mecanico}`);
        }

        doc.end();
    } catch (error) {
        console.error('Error al generar PDF:', error);
        res.status(500).json({ error: 'Error al generar el PDF' });
    }
};

// Exportar Excel de todo el historial
const exportarExcel = async (req, res) => {
    try {
        const historial = await HistorialVehiculo.findAll();
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Historial de Servicios');

        // Definir columnas
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Fecha', key: 'fecha', width: 15 },
            { header: 'Tipo de Servicio', key: 'tipo_servicio', width: 30 },
            { header: 'Descripción', key: 'descripcion', width: 40 },
            { header: 'Kilometraje', key: 'kilometraje', width: 15 },
            { header: 'Marca', key: 'marca', width: 15 },
            { header: 'Modelo', key: 'modelo', width: 20 },
            { header: 'Placa', key: 'placa', width: 15 },
            { header: 'Cliente', key: 'cliente', width: 30 },
            { header: 'Mecánico', key: 'mecanico', width: 30 }
        ];

        // Agregar datos
        historial.forEach(servicio => {
            worksheet.addRow({
                id: servicio.historial_id,
                fecha: new Date(servicio.fecha).toLocaleDateString(),
                tipo_servicio: servicio.tipo_servicio,
                descripcion: servicio.descripcion,
                kilometraje: servicio.kilometraje,
                marca: servicio.marca,
                modelo: servicio.modelo,
                placa: servicio.placa,
                cliente: `${servicio.nombre_usuario} ${servicio.apellido_usuario}`,
                mecanico: servicio.nombre_mecanico ? `${servicio.nombre_mecanico} ${servicio.apellido_mecanico}` : 'No asignado'
            });
        });

        // Estilo para el encabezado
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD3D3D3' }
        };

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=historial-servicios.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error al exportar Excel:', error);
        res.status(500).json({ error: 'Error al exportar el historial' });
    }
};


module.exports = {
    getAllHistorial,
    getHistorialById,
    getHistorialByVehiculo,
    getHistorialByOrden,
    getHistorialByMecanico,
    getHistorialByFecha,
    createHistorial,
    updateHistorial,
    deleteHistorial,
    exportarPDF,
    exportarExcel
}; 