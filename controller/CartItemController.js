const { StatusCodes } = require("http-status-codes");
const {
  selectCartItems,
  insertCartItem,
  deleteCartItem,
} = require("../models/cartItemQueries");
const decodeJwt = require("../utils/auth");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

const addToCart = async (req, res) => {
  const { bookId, quantity } = req.body;

  try {
    const decoded = decodeJwt(req, res);

    const [rows, fields] = await insertCartItem(decoded.id, bookId, quantity);
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

const getCartItems = async (req, res) => {
  let { selected_cart_item_id } = req.query;

  try {
    const decoded = decodeJwt(req, res);

    if (selected_cart_item_id) {
      selected_cart_item_id = selected_cart_item_id.split(",");
    }

    const [rows, fields] = await selectCartItems(
      decoded.id,
      selected_cart_item_id
    );
    res.status(StatusCodes.OK).json(rows);
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

const removeCartItem = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    const [rows, fields] = await deleteCartItem(cartItemId);
    res.status(StatusCodes.OK).json(rows);
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

module.exports = {
  getCartItems,
  addToCart,
  removeCartItem,
};
