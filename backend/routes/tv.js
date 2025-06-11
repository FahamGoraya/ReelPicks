const express = require("express");
const router = express.Router();
const {
  getTvidImg,
  getTvidVig,
  getTvidInfo,
} = require("../controller/tvController");

router.get("/:id/info", getTvidInfo);
router.get("/:id/img", getTvidImg);
router.get("/:id/vid", getTvidVig);

module.exports = router;
