const connection = require("../mariadb.js");

const insertLike = (user_id, liked_book_id, callback) => {
  const sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (${user_id}, ${liked_book_id})`;
  connection.query(sql, callback);
};

const deleteLike = (user_id, liked_book_id, callback) => {
  const sql = `DELETE FROM likes WHERE user_id = ${user_id} AND liked_book_id = ${liked_book_id}`;
  connection.query(sql, callback);
};

module.exports = {
  insertLike,
  deleteLike,
};
