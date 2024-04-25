const connection = require("../mariadb.js");

const insertLike = async (userId, likedBookId) => {
  const conn = await connection;

  const sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (${userId}, ${likedBookId})`;
  return await conn.query(sql);
};

const deleteLike = async (userId, likedBookId) => {
  const conn = await connection;

  const sql = `DELETE FROM likes WHERE user_id = ${userId} AND liked_book_id = ${likedBookId}`;
  return await conn.query(sql);
};

module.exports = {
  insertLike,
  deleteLike,
};
