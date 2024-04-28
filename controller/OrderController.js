const { StatusCodes } = require("http-status-codes");
const { insertDelivery } = require("../models/deliveryQueries");
const { insertOrderedBook } = require("../models/orderedBookQueries");
const {
  insertOrder,
  selectOrders,
  selectOrderDetail,
} = require("../models/orderQueries");
const {
  deleteCartItem,
  selectBookIdAndQuantity,
} = require("../models/cartItemQueries");
const decodeJwt = require("../utils/auth");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

const order = async (req, res) => {
  const { items, delivery, totalQuantity, totalPrice, fisrtBookTitle } =
    req.body;

  try {
    const decoded = decodeJwt(req);

    // 1. delivery 테이블에 데이터 추가
    const deliveryResult = await insertDelivery(delivery);
    const deliveryId = deliveryResult.insertId;
    // console.log(deliveryId);

    // 1.5. 주문할 상품의 book_id와 quantity 조회
    const [orderItems] = await selectBookIdAndQuantity(items);
    // console.log(orderItems);

    // 2. orders 테이블에 데이터 추가
    const orderResult = await insertOrder({
      userId: decoded.id,
      deliveryId,
      totalQuantity,
      totalPrice,
      fisrtBookTitle,
    });
    const orderId = orderResult.insertId;
    // console.log(orderId);

    // 3. ordered_book 테이블에 데이터 추가
    const orderedBookValues = orderItems.map(
      (item) => `(${orderId}, ${item.book_id}, ${item.quantity})`
    );
    console.log(orderedBookValues);
    await insertOrderedBook(orderedBookValues);
    res.status(StatusCodes.CREATED).json({ message: "주문이 완료되었습니다." });

    // 4. cartItems 테이블에서 주문한 상품 삭제
    await deleteCartItem(items);
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

const getOrders = async (req, res) => {
  try {
    const [rows, fields] = await selectOrders();
    res.status(StatusCodes.OK).json(rows);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "JWT 토큰이 만료되었습니다." });
      return;
    } else if (error instanceof JsonWebTokenError) {
    }
  }
};

const getOrderDetail = async (req, res) => {
  const { orderId } = req.params;

  try {
    const [rows, fields] = await selectOrderDetail(orderId);

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
    }
  }
};

module.exports = {
  order,
  getOrders,
  getOrderDetail,
};
