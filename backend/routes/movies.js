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
} = require("../controller/movieController");

const getOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
  },
});
router.get("/trend", getTrend);
router.get("/top", getTop);
router.get("/coming", getComing);
router.get("/:id/info", getByIdInfo);
router.get("/:id/img", getByIdImg);
router.get("/:id/vid", getByIdVid);

module.exports = router;
