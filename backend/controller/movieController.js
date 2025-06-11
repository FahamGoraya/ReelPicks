const { get } = require("http");

require("dotenv").config();

const getOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
  },
});

const getTrend = async (req, res) => {
  const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getTop = async (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getComing = async (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getByIdInfo = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getByIdImg = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}/images`;

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getByIdVid = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

module.exports = {
  getTrend,
  getTop,
  getComing,
  getByIdInfo,
  getByIdImg,
  getByIdVid,
};
