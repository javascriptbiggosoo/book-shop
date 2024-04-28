const connection = require("../mariadb.js");

const selectTotalBooks = async (category_id) => {
  const conn = await connection;

  let sql = `SELECT COUNT(*) AS total_count FROM books`;

  if (category_id) {
    sql += ` WHERE category_id = ${category_id}`;
  }

  return await conn.query(sql);
};

const selectBooks = async (requestParams, callback) => {
  const conn = await connection;
  let { category_id, lastest, limit, current_page } = requestParams;

  limit = parseInt(limit);
  current_page = parseInt(current_page);
  const offset = (current_page - 1) * limit;

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

  return await conn.query(sql, callback);
};

const selectBookById = async (bookId, userId) => {
  const conn = await connection;

  const sql = `
  SELECT *, 
    (SELECT count(*) FROM likes WHERE books.id=liked_book_id) AS likes,
    (SELECT EXISTS(SELECT * FROM likes WHERE user_id = ${userId} AND liked_book_id = ${bookId})) AS liked
  FROM books
  LEFT JOIN category 
  ON books.category_id = category.category_id
  WHERE books.id = ${bookId}`;

  return await conn.query(sql);
};

const selectBookWioutLogin = async (bookId) => {
  const conn = await connection;

  const sql = `
  SELECT *, 
    (SELECT count(*) FROM likes WHERE books.id=liked_book_id) AS likes
  FROM books
  LEFT JOIN category 
  ON books.category_id = category.category_id
  WHERE books.id = ${bookId}`;

  return await conn.query(sql);
};

module.exports = {
  selectBooks,
  selectBookById,
  selectTotalBooks,
  selectBookWioutLogin,
};
