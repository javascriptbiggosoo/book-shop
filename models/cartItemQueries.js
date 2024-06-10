const connection = require("../mariadb.js");

const insertCartItem = async (userId, bookId, quantity) => {
  const conn = await connection;

  const sql = `
  INSERT INTO cartItems (user_id, book_id, quantity)
  VALUES (${userId}, ${bookId}, ${quantity})`;
  return await conn.execute(sql);
};

const selectCartItems = async (userId, selectedCartItemId) => {
  const conn = await connection;
  console.log(selectedCartItemId);

  if (!selectedCartItemId) {
    const sql = `
    SELECT cartItems.id, book_id, title, summary, quantity, price
    FROM cartItems LEFT JOIN books
    ON cartItems.book_id = books.id
    WHERE user_id = ${userId}`;

    return await conn.execute(sql);
  }

  const sql = `
  SELECT cartItems.id, book_id, title, summary, quantity, price
  FROM cartItems LEFT JOIN books
  ON cartItems.book_id = books.id
  WHERE user_id = ${userId} AND cartItems.id IN (${selectedCartItemId})
  `;

  return await conn.execute(sql);
};

const selectBookIdAndQuantity = async (cartItemIds) => {
  const conn = await connection;
  const valuesString = cartItemIds.join(", ");
  const sql = `
  SELECT book_id, quantity
  FROM cartItems
  WHERE id IN (${valuesString})
  `;
  return await conn.query(sql);
};

const deleteCartItem = async (cartItemIds) => {
  if (typeof cartItemIds === "string") cartItemIds = [cartItemIds];

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
