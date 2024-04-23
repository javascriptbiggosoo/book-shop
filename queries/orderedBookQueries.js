const connection = require("../mariadb");

const insertOrderedBook = async (orderedBookValues) => {
  const valuesString = orderedBookValues.join(", ");
  const conn = await connection;

  const sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ${valuesString}`;

  return await conn.execute(sql);
};

module.exports = {
  insertOrderedBook,
};
