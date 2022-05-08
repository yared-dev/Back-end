const { Pool } = require("pg");
// Coloca aquí tus credenciales
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: "5432",
});
pool.connect((err, client, release) => {
  console.log(process.env.PGUSER);
  console.log(process.env.PGHOST);
  console.log(process.env.PGPASSWORD);
  console.log(process.env.PGDATABASE);
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("result.rows", result.rows);
  });
});

module.exports = pool;
