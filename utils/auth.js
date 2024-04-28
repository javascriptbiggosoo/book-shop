const jwt = require("jsonwebtoken");

function decodeJwt(req, res) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new ReferenceError("토큰이 없습니다.");
    }

    return jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (error) {
    throw error;
  }
}

module.exports = decodeJwt;
