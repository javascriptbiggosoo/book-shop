const express = require("express");

const router = express.Router();
router.use(express.json());

// 전체 도서 조회
router.get("/", (req, res) => {
  res.json({ message: "" });
});

// 개별 도서 조회
router.get("/:id", (req, res) => {
  res.json({ message: "" });
});

// 카테고리별 도서 조회
router.get("/", (req, res) => {
  res.json({ message: "" });
});

module.exports = router;
