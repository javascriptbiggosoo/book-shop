const connection = require("../mariadb.js");

const insertUser = async (email, password, salt) => {
  const conn = await connection;
  const sql = `INSERT INTO users (email, password, salt) VALUES ("${email}", "${password}", "${salt}")`;

  return await conn.execute(sql);
};

const findUserByEmail = async (email) => {
  const conn = await connection;

  const sql = `SELECT * FROM users WHERE email = "${email}" `;
  return await conn.query(sql);
};

const findUserForPasswordReset = async (email) => {
  const conn = await connection;
  const sql = `SELECT * FROM users WHERE email = "${email}"`;
  return await conn.query(sql);
};

const updateUserPassword = async (email, password, salt) => {
  const conn = await connection;
  const sql = `UPDATE users SET password = "${password}", salt = "${salt}" WHERE email = "${email}"`;
  return await conn.query(sql);
};

module.exports = {
  insertUser,
  findUserByEmail,
  findUserForPasswordReset,
  updateUserPassword,
};
