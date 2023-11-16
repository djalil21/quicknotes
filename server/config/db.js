const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function connectAndQuery() {
    try {
        const connection = await pool.getConnection();
        // Example query
        const [rows, fields] = await connection.execute('SELECT * FROM user LIMIT 1');
        // Close the connection after the query is executed
        connection.release();
        console.log('rows Results:', rows);
    } catch (error) {
        console.error('Error:', error);
    }
}

connectAndQuery();


module.exports = pool;