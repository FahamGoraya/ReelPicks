const verfityjwt = require("../middleware/verfityjwt");
const express = require("express");
const router = express.Router();
const { getRecommend } = require("../controller/movieRecommendController");
router.post("/", getRecommend);

module.exports = router;
