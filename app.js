const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const orderRouter = require("./routes/orders");
const cartRouter = require("./routes/carts");
const likeRouter = require("./routes/likes");

const app = express();

dotenv.config(); // Load environment variables from .env file
// console.log(process.env.PORT);

app.listen(process.env.PORT);

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/orders", orderRouter);
app.use("/carts", cartRouter);
app.use("/likes", likeRouter);

// k조 김진영
