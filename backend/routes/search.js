require("dotenv").config();
const express = require("express");
const { verifyJwt } = require("../middleware/verfityjwt");
const router = express.Router();
const { searchQuery } = require("../controller/searchController");

router.get("/:query", searchQuery);

module.exports = router;
