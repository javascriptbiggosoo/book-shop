const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const connection = require("../mariadb.js");
const {
  insertUser,
  findUserByEmail: findUserByEmailAndPassword,
} = require("../queries/usersQueries.js");

dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;

  // 암호화된 비밀번호와 salt 값을 DB에 저장
  const salt = crypto.randomBytes(20).toString("base64"); // 64바이트 길이의 랜덤 문자열
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 100000, 20, "sha512")
    .toString("base64"); // 비밀번호, salt, 해시 반복 횟수, 해시 길이, 해시 알고리즘 종류

  insertUser(email, hashPassword, salt, (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    res.status(StatusCodes.CREATED).json({ message: "회원가입 성공" });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmailAndPassword(email, (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    const loginUserInfo = result[0];

    const hashPassword = crypto
      .pbkdf2Sync(password, loginUserInfo.salt, 100000, 20, "sha512")
      .toString("base64");

    if (loginUserInfo.password !== hashPassword) {
      res.status(StatusCodes.UNAUTHORIZED).end();
      return;
    }

    const token = jwt.sign({ email }, process.env.PRIVATE_KEY, {
      expiresIn: "3m",
    });

    res.cookie("token", token, { httpOnly: true });
    console.log(token);

    res.status(StatusCodes.OK).json({ message: "로그인 성공" });
    return;
  });
};

const passwordResetRequest = (req, res) => {
  const { email } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  connection.query(sql, [email], (err, result) => {
    //
    if (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    // 가입되지 않은 이메일
    if (result.length === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    res.status(StatusCodes.OK).end();
  });
};

const passwordReset = (req, res) => {
  const { email, password } = req.body;

  const sql = `UPDATE users SET password = ? WHERE email = ?`;
  connection.query(sql, [password, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    // console.log(result);
    if (result.affectedRows === 0) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    res.status(StatusCodes.OK).json(result);
  });
};

module.exports = { join, login, passwordResetRequest, passwordReset };
