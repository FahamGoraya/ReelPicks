const express = require("express");
const router = express.Router();
const {
  userLogin,
  getInfo,
  userLogout,
  userSignup,
} = require("../controller/userController");
const { verifyJwt } = require("../middleware/verfityjwt");
router.post("/login", userLogin);
router.post("/getinfo", verifyJwt, getInfo);
router.post("/logout", verifyJwt, userLogout);
router.post("/signup", userLogin);

module.exports = router;
