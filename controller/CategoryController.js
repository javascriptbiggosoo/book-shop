const { StatusCodes } = require("http-status-codes");
const { selectAllCategories } = require("../models/categoryQueries");

const getAllCategories = async (req, res) => {
  const [rows, fields] = await selectAllCategories();
  res.status(StatusCodes.OK).json(rows);
};

module.exports = { getAllCategories };
