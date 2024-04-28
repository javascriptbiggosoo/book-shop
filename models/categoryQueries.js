const connection = require("../mariadb.js");

const selectAllCategories = (callback) => {
  const sql = `SELECT * FROM category`;
  connection.query(sql, callback);
};

module.exports = {
  selectAllCategories,
};
