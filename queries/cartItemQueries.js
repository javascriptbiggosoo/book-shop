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
    connection.execute(sql, callback);
    return;
  }

  const sql = `
  SELECT cartItems.id, book_id, title, summary, quantity, price
  FROM cartItems LEFT JOIN books
  ON cartItems.book_id = books.id
  WHERE user_id = ${userId} AND cartItems.id IN (${selectedCartItemId})
  `;
  connection.execute(sql, callback);
};

const selectBookIdAndQuantity = async (cartItemIds) => {
  const conn = await connection;
  // console.log(cartItemIds); // [1, 2, 3]
  const valuesString = cartItemIds.join(", ");

  const sql = `
  SELECT book_id, quantity
  FROM cartItems
  WHERE id IN (${valuesString})
  `;
  return await conn.execute(sql);
};

const deleteCartItem = async (cartItemIds) => {
  const valuesString = cartItemIds.join(", ");
  const conn = await connection;

  const sql = `
  DELETE FROM cartItems
  WHERE id IN (${valuesString})
  `;

  return await conn.execute(sql);
};

module.exports = {
  selectCartItems,
  selectBookIdAndQuantity,
  insertCartItem,
  deleteCartItem,
};
