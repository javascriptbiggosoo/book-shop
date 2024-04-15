const connection = require("../mariadb.js");

const insertUser = (email, password, salt, callback) => {
  const sql = `INSERT INTO users (email, password, salt) VALUES ("${email}", "${password}", "${salt}")`;
  connection.query(sql, callback);
};

const findUserByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = "${email}" `;
  connection.query(sql, callback);
};

const findUserForPasswordReset = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = "${email}"`;
  connection.query(sql, callback);
};

const updateUserPassword = (email, password, salt, callback) => {
  const sql = `UPDATE users SET password = "${password}", salt = "${salt}" WHERE email = "${email}"`;
  connection.query(sql, callback);
};

module.exports = {
  insertUser,
  findUserByEmail,
  findUserForPasswordReset,
  updateUserPassword,
};
