const connection = require("../mariadb.js");

const insertDelivery = ({ address, receiver, contact }, callback) => {
  const sql = `INSERT INTO delivery (address, receiver, contact) VALUES ('${address}', '${receiver}', '${contact}')`;

  connection.query(sql, callback);
};

module.exports = {
  insertDelivery,
};
