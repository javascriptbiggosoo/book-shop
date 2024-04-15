const express = require("express");
const { getAllCategories } = require("../controller/CategoryController");

const router = express.Router();
router.use(express.json());

// 카테고리 조회
router.get("/", getAllCategories);

module.exports = router;
