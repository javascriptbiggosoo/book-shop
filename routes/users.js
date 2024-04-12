const express = require("express");
const {
  join,
  login,
  passwordResetRequest,
  passwordReset,
} = require("../controller/UserController");

const router = express.Router();
router.use(express.json());

router.post("/join", join);
router.post("/login", login);
// 비밀번호 초기화 요청
router.post("/reset", passwordResetRequest);
// 새 비밀번호로 변경
router.put("/reset", passwordReset);

module.exports = router;
