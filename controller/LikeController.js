// k조 김진영
const { StatusCodes } = require("http-status-codes");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");
const { insertLike, deleteLike } = require("../models/likeQueries");
const decodeJwt = require("../utils/auth");

const addLike = async (req, res) => {
  const { bookId } = req.params;

  try {
    const decoded = decodeJwt(req);

    const [rows, fields] = await insertLike(decoded.id, bookId);
    res.status(StatusCodes.CREATED).json(rows);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "JWT 토큰이 만료되었습니다." });
      return;
    } else if (error instanceof JsonWebTokenError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "JWT 토큰이 유효하지 않습니다." });
      return;
    }
  }
};

const cancleLike = async (req, res) => {
  const { bookId } = req.params;

  const decoded = decodeJwt(req);

  const [rows, fields] = await deleteLike(decoded.id, bookId);
  res.status(StatusCodes.OK).json(rows);
};

module.exports = {
  addLike,
  cancleLike,
};
