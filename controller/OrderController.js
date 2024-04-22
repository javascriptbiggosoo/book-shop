const { StatusCodes } = require("http-status-codes");
const { insertDelivery } = require("../queries/deliveryQueries");
const { insertOrderedBook } = require("../queries/orderedBookQueries");
const { insertOrder } = require("../queries/orderQueries");

const order = (req, res) => {
  const { userId, items, delivery, totalQuantity, totalPrice, fisrtBookTitle } =
    req.body;

  let deliveryId = 2;
  let orderId = 2;

  // 1. delivery 테이블에 데이터 추가
  insertDelivery(delivery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    const deliveryId = result.insertId;
  });

  // 2. orders 테이블에 데이터 추가
  insertOrder(
    { userId, deliveryId, totalQuantity, totalPrice, fisrtBookTitle },
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(StatusCodes.BAD_REQUEST).end();
        return;
      }

      const orderId = result.insertId;
    }
  );

  // 3. ordered_book 테이블에 데이터 추가
  const orderedBookValues = items.map(
    (item) => `(${deliveryId}, ${item.bookId}, ${item.quantity})`
  );
  const valuesString = orderedBookValues.join(", ");

  insertOrderedBook(valuesString, (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    res.status(StatusCodes.CREATED).json(result);
  });
};

const getOrders = (req, res) => {
  res.json({ message: "" });
};

const getOrderDetail = (req, res) => {
  res.json({ message: "" });
};

module.exports = {
  order,
  getOrders,
  getOrderDetail,
};
