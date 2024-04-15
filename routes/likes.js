const express = require("express");
const { addLike, deleteLike } = require("../controller/LikeController");

const router = express.Router();
router.use(express.json());

router.post("/:id", addLike);
router.delete("/:id", deleteLike);

module.exports = router;
