// Get the client
// const mysql = require("mysql2");
const mysql = require("mysql2/promise");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Bookshop",
  dateStrings: true,
});

module.exports = connection;
