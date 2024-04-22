const connection = require("../mariadb.js");

const insertOrder = (
  { userId, deliveryId, totalQuantity, totalPrice, fisrtBookTitle },
  callback
) => {
  const sql = `INSERT INTO orders (user_id, delivery_id, total_quantity, total_price, book_title) VALUES (${userId}, ${deliveryId}, ${totalQuantity}, ${totalPrice}, '${fisrtBookTitle}')`;

  connection.query(sql, callback);
};

module.exports = {
  insertOrder,
};
