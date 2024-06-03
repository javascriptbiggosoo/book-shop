const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const orderRouter = require("./routes/orders");
const cartRouter = require("./routes/cartItems");
const likeRouter = require("./routes/likes");
const categoryRouter = require("./routes/categories");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Access-Control-Allow-Credentials 설정
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

dotenv.config(); // Load environment variables from .env file
// console.log(process.env.PORT);

app.listen(process.env.PORT);

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);
app.use("/cart-items", cartRouter);
app.use("/likes", likeRouter);
