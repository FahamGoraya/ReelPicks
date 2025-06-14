const express = require("express");
const router = express.Router();
const {
  userLogin,
  getInfo,
  userLogout,
} = require("../controller/userController");
const { verifyJwt } = require("../middleware/verfityjwt");
router.post("/login", userLogin);
router.post("/getinfo", verifyJwt, getInfo);
router.post("/logout", verifyJwt, userLogout);

module.exports = router;
