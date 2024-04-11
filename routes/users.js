
const express = require("express");

const router = express.Router();
router.use(express.json());

// 가입
router.post("/join", (req, res) => {
  res.json({ message: "회원가입 성공" });
});

// 로그인
router.post("/login");

// 비밀번호 초기화 요청
router.post("/reset");

// 새 비밀번호로 변경
router.put("/reset");

module.exports = router;
