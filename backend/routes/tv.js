const express = require("express");
const router = express.Router();
const {
  getTvidImg,
  getTvidVig,
  getTvidInfo,
  getTvSimiliarbyId,
  getTvReviews,
} = require("../controller/tvController");
const { verifyJwt } = require("../middleware/verfityjwt");

router.get("/:id/info", verifyJwt, getTvidInfo);
router.get("/:id/img", verifyJwt, getTvidImg);
router.get("/:id/vid", verifyJwt, getTvidVig);
router.get("/:id/similar", verifyJwt, getTvSimiliarbyId);
router.get("/:id/reviews", verifyJwt, getTvReviews);
module.exports = router;
