require("dotenv").config();
const express = require("express");
const router = express.Router();

// Reuse API key from environment

const getOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
  },
});

router.get("/trend", (req, res) => {
  const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

router.get("/top", (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

router.get("/coming", (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

router.get("/:id/info", (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

router.get("/:id/img", (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}/images`;

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

router.get("/:id/vid", (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

module.exports = router;
