// k조 김진영
const express = require("express");
const { addLike, cancleLike } = require("../controller/LikeController");

const router = express.Router();
router.use(express.json());

router.post("/:bookId", addLike);
router.delete("/:bookId", cancleLike);

module.exports = router;
