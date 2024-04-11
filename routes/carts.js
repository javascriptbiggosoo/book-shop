const express = require("express");

const router = express.Router();
router.use(express.json());

// 장바구니 담기
router.post("/", (req, res) => {
  res.json({ message: "" });
});

// 장바구니 조회
router.get("/", (req, res) => {
  res.json({ message: "" });
});

// 장바구니 선택 삭제
router.delete("/:id", (req, res) => {
  res.json({ message: "" });
});

module.exports = router;
