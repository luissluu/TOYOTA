const mssql = require("mssql");

const connectionSettings = {
    server: "localhost",
    database: "Toyota",
    user: "sebas",
    password: "sebas",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function getConnection() {
    try {
        const pool = await mssql.connect(connectionSettings);
        console.log('Conexión exitosa a la base de datos');
        return pool;
    } catch (error) {
        console.error('Error de conexión:', error);
        throw error;
    }
}

getConnection();
module.exports = { getConnection, mssql };

