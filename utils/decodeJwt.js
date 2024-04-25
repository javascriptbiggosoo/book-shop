const jwt = require("jsonwebtoken");

function decodeJwt(req, res) {
  try {
    const token = req.headers.authorization;

    return jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (error) {
    throw error;
  }
}

module.exports = decodeJwt;
