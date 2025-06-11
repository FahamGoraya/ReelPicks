require("dotenv").config();
const express = require("express");
const router = express.Router();

// Use API key from .env
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Reusable fetch options
const getOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
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
