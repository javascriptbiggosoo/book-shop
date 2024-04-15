const express = require("express");
const { getBooks, getBookDetail } = require("../controller/BookController");

const router = express.Router();
router.use(express.json());

router.get("/", getBooks); // 도서 조회
router.get("/:id", getBookDetail); // 개별 도서 조회

module.exports = router;
