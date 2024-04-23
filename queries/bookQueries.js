const connection = require("../mariadb.js");

const selectBooks = (requestParams, callback) => {
  let { category_id, lastest, limit, currentPage } = requestParams;

  limit = parseInt(limit);
  currentPage = parseInt(currentPage);
  const offset = (currentPage - 1) * limit;

  let sql = `
  SELECT *,
  (SELECT count(*) FROM likes WHERE books.id=liked_book_id) AS likes
  FROM books`;

  if (category_id) {
    sql += ` WHERE category_id = ${category_id}`;
  }

  if (lastest) {
    if (category_id) {
      sql += ` AND pub_date >= DATE_SUB(NOW(), INTERVAL 1 MONTH)`;
    } else {
      sql += ` WHERE pub_date >= DATE_SUB(NOW(), INTERVAL 1 MONTH)`;
    }
  }

  sql += ` LIMIT ${limit} OFFSET ${offset};`;

  connection.query(sql, callback);
};

const selectBookById = (bookId, userId, callback) => {
  const sql = `
  SELECT *, 
    (SELECT count(*) FROM likes WHERE books.id=liked_book_id) AS likes,
    (SELECT EXISTS(SELECT * FROM likes WHERE user_id = ${userId} AND liked_book_id = ${bookId})) AS liked
  FROM books
  LEFT JOIN category 
  ON books.category_id = category.category_id
  WHERE books.id = ${bookId}`;
  connection.query(sql, callback);
};

module.exports = {
  selectBooks,
  selectBookById,
};
