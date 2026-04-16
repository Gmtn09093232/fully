const mysql = require("mysql2");

// Create connection pool (better than single connection)
const db = mysql.createPool({
    host: process.env.DB_HOST || "host",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "bingo_db",

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    connectTimeout: 10000 // avoid long hanging
});

// Test connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed:");
        console.error(err);
    } else {
        console.log("✅ MySQL Connected Successfully");
        connection.release();
    }
});

module.exports = db;

