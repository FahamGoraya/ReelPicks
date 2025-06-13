require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  getTrend,
  getByIdImg,
  getComing,
  getTop,
  getByIdInfo,
  getByIdVid,
  getMoiveSimiliarbyId,
} = require("../controller/movieController");

router.get("/trend", getTrend);
router.get("/top", getTop);
router.get("/coming", getComing);
router.get("/:id/info", getByIdInfo);
router.get("/:id/img", getByIdImg);
router.get("/:id/vid", getByIdVid);
router.get("/:id/similar", getMoiveSimiliarbyId);

module.exports = router;
