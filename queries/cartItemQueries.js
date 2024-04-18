const connection = require("../mariadb.js");

const insertCartItem = (userId, bookId, quantity, callback) => {
  const sql = `
  INSERT INTO cartItems (user_id, book_id, quantity)
  VALUES (${userId}, ${bookId}, ${quantity})`;
  connection.query(sql, callback);
};

const selectCartItems = (userId, selectedCartItemId, callback) => {
  console.log(selectedCartItemId);

  if (!selectedCartItemId) {
    const sql = `
    SELECT cartItems.id, book_id, title, summary, quantity, price
    FROM cartItems LEFT JOIN books
    ON cartItems.book_id = books.id
    WHERE user_id = ${userId}`;
    connection.query(sql, callback);
    return;
  }

  const sql = `
  SELECT cartItems.id, book_id, title, summary, quantity, price
  FROM cartItems LEFT JOIN books
  ON cartItems.book_id = books.id
  WHERE user_id = ${userId} AND cartItems.id IN (${selectedCartItemId})
  `;
  connection.query(sql, callback);
};

const deleteCartItem = (cartItemId, callback) => {
  const sql = `
  DELETE FROM cartItems
  WHERE id = ${cartItemId}`;
  connection.query(sql, callback);
};

module.exports = {
  selectCartItems,
  insertCartItem,
  deleteCartItem,
};
