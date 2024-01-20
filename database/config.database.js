const mysql = require("mysql");
// Coloca aquí tus credenciales
const pool = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "9514",
  database: "appledb",
  port: "3306",
});

 
pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
module.exports = pool;
