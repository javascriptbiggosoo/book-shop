// k조 김진영
const { StatusCodes } = require("http-status-codes");
const { insertLike, deleteLike } = require("../queries/likeQueries");

const addLike = (req, res) => {
  const { bookId, userId, quantity } = req.body;

  insertLike(userId, bookId, quantity, (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      return;
    }

    res.status(StatusCodes.CREATED).json(result);
  });
};

const cancleLike = (req, res) => {
  const { userId } = req.body;
  const { bookId } = req.params;

  deleteLike(userId, bookId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      return;
    }

    res.status(StatusCodes.OK).json(result);
  });
};

module.exports = {
  addLike,
  cancleLike,
};
