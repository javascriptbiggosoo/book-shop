const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
  insertUser,
  findUserByEmail,
  findUserForPasswordReset,
  updateUserPassword,
} = require("../models/userQueries.js");

dotenv.config();

const join = async (req, res) => {
  const { email, password } = req.body;

  // 암호화된 비밀번호와 salt 값을 DB에 저장
  const salt = crypto.randomBytes(20).toString("base64"); // 64바이트 길이의 랜덤 문자열
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 100000, 20, "sha512")
    .toString("base64"); // 비밀번호, salt, 해시 반복 횟수, 해시 길이, 해시 알고리즘 종류

  const [rows, fields] = await insertUser(email, hashPassword, salt);
  console.log(rows);
  res.status(StatusCodes.CREATED).json({ message: "회원가입 성공" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // 이메일로 사용자 정보 조회
  const [rows] = await findUserByEmail(email);
  const loginUserInfo = rows[0];

  // 로그인
  const hashPassword = crypto
    .pbkdf2Sync(password, loginUserInfo.salt, 100000, 20, "sha512")
    .toString("base64");

  if (loginUserInfo.password !== hashPassword) {
    res.status(StatusCodes.UNAUTHORIZED).end();
    return;
  }

  // JWT 토큰 생성
  const token = jwt.sign(
    {
      email: loginUserInfo.email,
      id: loginUserInfo.id,
    },
    process.env.PRIVATE_KEY,
    {
      expiresIn: "4hr",
    }
  );

  // 쿠키에 토큰 저장
  res.cookie("token", token, { httpOnly: true });
  console.log(token);

  res.status(StatusCodes.OK).json({ token });
};

const passwordResetRequest = async (req, res) => {
  const { email } = req.body;

  const [rows, fields] = await findUserForPasswordReset(email);
  console.log(rows);
  if (rows.length === 0) {
    res.status(StatusCodes.NOT_FOUND).end();
    return;
  }

  res.status(StatusCodes.OK).end();
};

const passwordReset = async (req, res) => {
  const { email, password } = req.body;

  const salt = crypto.randomBytes(20).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 100000, 20, "sha512")
    .toString("base64");

  const [rows, fields] = await updateUserPassword(email, hashPassword, salt);
  if (rows.length === 0) {
    res.status(StatusCodes.NOT_FOUND).end();
    return;
  }
  res.status(StatusCodes.OK).json(rows);
};

module.exports = { join, login, passwordResetRequest, passwordReset };
