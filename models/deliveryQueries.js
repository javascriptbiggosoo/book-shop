const connection = require("../mariadb.js");

const insertDelivery = async ({ address, receiver, contact }) => {
  const conn = await connection;

  const sql = `INSERT INTO delivery (address, receiver, contact) VALUES ('${address}', '${receiver}', '${contact}')`;

  const [result] = await conn.execute(sql);
  return result;
};

module.exports = {
  insertDelivery,
};
