const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function enviarCorreo(destinatario, asunto, html) {
    await transporter.sendMail({
        from: `"Toyota Taller" <${process.env.EMAIL_USER}>`,
        to: destinatario,
        subject: asunto,
        html
    });
}

module.exports = { enviarCorreo }; 