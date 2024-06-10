const connection = require("../mariadb.js");

const insertOrder = async ({
  userId,
  deliveryId,
  totalQuantity,
  totalPrice,
  fisrtBookTitle,
}) => {
  // console.log(userId, deliveryId, totalQuantity, totalPrice, fisrtBookTitle);
  const conn = await connection;
  const sql = `INSERT INTO orders (user_id, delivery_id, total_quantity, total_price, book_title) VALUES (${userId}, ${deliveryId}, ${totalQuantity}, "${totalPrice}", "${fisrtBookTitle}")`;
  const result = await conn.query(sql);
  return result;
};

const selectOrders = async () => {
  const conn = await connection;

  const sql = `
  SELECT orders.id, total_quantity, total_price, book_title, address, receiver, contact, created_at
  FROM orders LEFT JOIN delivery
  ON orders.delivery_id = delivery.id
  `;
  return await conn.execute(sql);
};

const selectOrderDetail = async (orderId) => {
  const conn = await connection;

  const sql = `
  SELECT book_id, title, quantity, price, author
  FROM orderedBook LEFT JOIN books
  ON orderedBook.book_id = books.id
  WHERE order_id = ${orderId}
  `;
  return await conn.execute(sql);
};

module.exports = {
  insertOrder,
  selectOrders,
  selectOrderDetail,
};
