const { StatusCodes } = require("http-status-codes");
const { selectAllCategories } = require("../queries/categoryQueries");

const getAllCategories = (req, res) => {
  selectAllCategories((err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      return;
    }

    res.status(StatusCodes.OK).json(result);
  });
};

module.exports = { getAllCategories };
