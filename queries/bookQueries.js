const connection = require("../mariadb.js");

const selectBooks = (query, callback) => {
  let { category_id, lastest, limit, currentPage } = query;

  limit = parseInt(limit);
  currentPage = parseInt(currentPage);
  const offset = (currentPage - 1) * limit;

  let sql = `SELECT * FROM books`;

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

const selectBookById = (id, callback) => {
  const sql = `SELECT * FROM books LEFT JOIN category ON books.category_id = category.id WHERE books.id = ${id};`;
  connection.query(sql, callback);
};

module.exports = {
  selectBooks,
  selectBookById,
};
