// k조 김진영
const { StatusCodes } = require("http-status-codes");
const { insertLike, deleteLike } = require("../queries/likeQueries");

const addLike = (req, res) => {
  const { user_id } = req.body;
  const { bookId } = req.params;

  insertLike(user_id, bookId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      return;
    }

    res.status(StatusCodes.CREATED).json(result);
  });
};

const cancleLike = (req, res) => {
  const { user_id } = req.body;
  const { bookId } = req.params;

  deleteLike(user_id, bookId, (err, result) => {
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
