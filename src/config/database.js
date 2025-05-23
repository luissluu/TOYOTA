const mssql = require("mssql");

const connectionSettings = {
    server: process.env.DB_SERVER || "woinix.database.windows.net",
    database: process.env.DB_NAME || "ToyotaDB",
    user: process.env.DB_USER || "seb07",
    password: process.env.DB_PASSWORD || 'ElbichoSiu"',
    options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true,
        connectionTimeout: 30000,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    }
};

let pool = null;

async function getConnection() {
    try {
        if (pool) {
            return pool;
        }
        pool = await mssql.connect(connectionSettings);
        console.log('Conexión exitosa a la base de datos');
        return pool;
    } catch (error) {
        console.error('Error de conexión:', error);
        pool = null;
        throw error;
    }
}

// No llamar a getConnection() aquí
module.exports = { getConnection, mssql };

