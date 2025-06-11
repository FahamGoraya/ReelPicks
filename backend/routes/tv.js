require("dotenv").config();
const express = require("express");
const router = express.Router();

// Reusable fetch options
const getOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
  },
});

router.get("/:id/info", (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

router.get("/:id/img", (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/tv/${id}/images`;

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

router.get("/:id/vid", (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

module.exports = router;
