const { StatusCodes } = require("http-status-codes");
const {
  selectCartItems,
  insertCartItem,
  deleteCartItem,
} = require("../queries/cartItemQueries");

const addToCart = (req, res) => {
  const { userId, bookId, quantity } = req.body;

  insertCartItem(userId, bookId, quantity, (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    res.status(StatusCodes.CREATED).json(result);
  });
};

const getCartItems = (req, res) => {
  const { userId } = req.params;
  let { selected_cart_item_id } = req.query;
  if (selected_cart_item_id) {
    selected_cart_item_id = selected_cart_item_id.split(",");
  }

  selectCartItems(userId, selected_cart_item_id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      return;
    }

    res.status(StatusCodes.OK).json(result);
  });
};

const removeCartItem = (req, res) => {
  const { cartItemId } = req.params;

  deleteCartItem(cartItemId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    res.status(StatusCodes.OK).json(result);
  });
};

module.exports = {
  getCartItems,
  addToCart,
  removeCartItem,
};
