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
  const {
    items,
    delivery,
    total_quantity: totalQuantity,
    total_price: totalPrice,
    fisrt_book_title: fisrtBookTitle,
    user_id: userId,
  } = req.body;
  // console.log(req.body);
  try {
    const decoded = decodeJwt(req);

    // 1. delivery 테이블에 데이터 추가
    const deliveryResult = await insertDelivery(delivery);
    const deliveryId = deliveryResult.insertId;
    // console.log(deliveryId);

    // 1.5. 주문할 상품의 book_id와 quantity 조회
    const [rowsx, fieldsx] = await selectBookIdAndQuantity(items);
    const orderItems = rowsx.map((item) => ({
      book_id: item.book_id,
      quantity: item.quantity,
    }));
    console.log("orderItems: " + orderItems);

    // 2. orders 테이블에 데이터 추가
    const [row, fields] = await insertOrder({
      userId, // od
      deliveryId, // ok
      totalQuantity, // ok
      totalPrice, // ok
      fisrtBookTitle, // ok
    });
    console.log("row: ", row);
    const { insertId: orderId } = row;

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
