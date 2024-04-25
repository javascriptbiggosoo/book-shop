// k조 김진영
const { StatusCodes } = require("http-status-codes");
const { insertLike, deleteLike } = require("../queries/likeQueries");
const decodeJwt = require("../utils/decodeJwt");

const addLike = async (req, res) => {
  const { bookId } = req.params;

  const decoded = decodeJwt(req);

  const [rows, fields] = await insertLike(decoded.id, bookId);
  res.status(StatusCodes.CREATED).json(rows);
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
