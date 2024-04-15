const express = require("express");

const router = express.Router();
router.use(express.json());

// 주문하기
router.post("/", (req, res) => {
  res.json({ message: "" });
});
// 주문 목록 조회
router.get("/", (req, res) => {
  res.json({ message: "" });
});
// 개별 주문 상세 조회
router.get("/:id", (req, res) => {
  res.json({ message: "" });
});

module.exports = router;
