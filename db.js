const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "mysql-b39fece-gizie1873.b.aivencloud.com",
  port: 13926,
  user: "avnadmin",
  password: "AVNS_JUIBkMXXEiKVHHy13Bu",
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect(err => {
  if (err) console.error("Connection failed:", err);
  else console.log("Connected to Aiven MySQL");
});

module.exports = db;