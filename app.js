const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const orderRouter = require("./routes/orders");
const cartRouter = require("./routes/cartItems");
const likeRouter = require("./routes/likes");
const categoryRouter = require("./routes/category");

const app = express();

dotenv.config(); // Load environment variables from .env file
// console.log(process.env.PORT);

app.listen(process.env.PORT);

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/category", categoryRouter);
app.use("/orders", orderRouter);
app.use("/cart-items", cartRouter);
app.use("/likes", likeRouter);
