const connection = require("../mariadb");

const insertOrderedBook = (valuesString, callback) => {
  const sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ${valuesString}`;

  connection.query(sql, callback);
};

module.exports = {
  insertOrderedBook,
};
