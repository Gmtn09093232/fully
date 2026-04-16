require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT),
            ssl: { rejectUnauthorized: false }
        });
        console.log('✅ Connection successful');
        const [rows] = await conn.execute('SELECT 1+1 AS result');
        console.log('Query result:', rows);
        await conn.end();
    } catch (err) {
        console.error('Connection failed:', err.message);
    }
})();