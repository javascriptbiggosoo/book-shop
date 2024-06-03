const connection = require("../mariadb.js");

const selectAllCategories = async () => {
  const conn = await connection;
  const sql = `SELECT * FROM category`;

  return await conn.execute(sql);
};

module.exports = {
  selectAllCategories,
};
