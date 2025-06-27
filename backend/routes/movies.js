require("dotenv").config();
const express = require("express");
const { verifyJwt } = require("../middleware/verfityjwt");
const router = express.Router();
const {
  getTrend,
  getByIdImg,
  getComing,
  getTop,
  getByIdInfo,
  getByIdVid,
  getMoiveSimiliarbyId,
  getMovieByName,
} = require("../controller/movieController");

router.get("/trend", verifyJwt, getTrend);
router.get("/top", verifyJwt, getTop);
router.get("/coming", verifyJwt, getComing);
router.get("/:id/info", verifyJwt, getByIdInfo);
router.get("/:id/img", verifyJwt, getByIdImg);
router.get("/:id/vid", verifyJwt, getByIdVid);
router.get("/:id/similar", verifyJwt, getMoiveSimiliarbyId);
router.post("/search/:name", verifyJwt, getMovieByName);

module.exports = router;
