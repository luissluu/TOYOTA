const mssql = require("mssql");

const connectionSettings = {
    server: "woinix.database.windows.net",
    database: "ToyotaDB",
    user: "seb07",
    password: 'ElbichoSiu"',
    options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true,
        connectionTimeout: 30000
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

