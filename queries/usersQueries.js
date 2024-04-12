const connection = require("../mariadb.js");

const insertUser = (email, password, salt, callback) => {
  const sql = `INSERT INTO users (email, password, salt) VALUES (?, ?, ?)`;
  connection.query(sql, [email, password, salt], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = ? `;
  connection.query(sql, email, callback);
};

// 다른 쿼리 함수들...

module.exports = {
  insertUser,
  findUserByEmail,
  // 다른 함수들 export...
};
