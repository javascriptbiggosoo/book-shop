const { StatusCodes } = require("http-status-codes");

const { selectBooks, selectBookById } = require("../queries/bookQueries");

const getBooks = (req, res) => {
  const { category_id, lastest, limit, currentPage } = req.query;

  selectBooks({ category_id, lastest, limit, currentPage }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      return;
    }

    res.status(StatusCodes.OK).json(result);
  });
};

const getBookDetail = (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.body;

  selectBookById(bookId, userId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      return;
    }

    if (result.length === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    res.status(StatusCodes.OK).json(result[0]);
  });
};

module.exports = { getBooks, getBookDetail };
