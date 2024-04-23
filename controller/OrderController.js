const { StatusCodes } = require("http-status-codes");
const { insertDelivery } = require("../queries/deliveryQueries");
const { insertOrderedBook } = require("../queries/orderedBookQueries");
const {
  insertOrder,
  selectOrders,
  selectOrderDetail,
} = require("../queries/orderQueries");
const {
  deleteCartItem,
  selectBookIdAndQuantity,
} = require("../queries/cartItemQueries");

const order = async (req, res) => {
  const { userId, items, delivery, totalQuantity, totalPrice, fisrtBookTitle } =
    req.body;

  // 1. delivery 테이블에 데이터 추가
  const deliveryResult = await insertDelivery(delivery);
  const deliveryId = deliveryResult.insertId;
  // console.log(deliveryId);

  // 1.5. 주문할 상품의 book_id와 quantity 조회
  const [orderItems] = await selectBookIdAndQuantity(items);
  // console.log(orderItems);

  // 2. orders 테이블에 데이터 추가
  const orderResult = await insertOrder({
    userId,
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
};

const getOrders = async (req, res) => {
  const [rows, fields] = await selectOrders();
  res.status(StatusCodes.OK).json(rows);
};

const getOrderDetail = async (req, res) => {
  const { orderId } = req.params;
  const [rows, fields] = await selectOrderDetail(orderId);

  res.status(StatusCodes.OK).json(rows);
};

module.exports = {
  order,
  getOrders,
  getOrderDetail,
};
