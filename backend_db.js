const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'student', 
  database: 'Bank_Management'
});

module.exports = connection;
