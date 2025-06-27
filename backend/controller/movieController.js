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

  await fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getTop = async (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

  await fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getComing = async (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

  await fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getByIdInfo = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  await fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getByIdImg = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}/images`;

  await fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getByIdVid = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

  await fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getMoiveSimiliarbyId = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;

  await fetch(url, getOptions())
    .then((res) => res.json())
    .then((json) => res.json(json))
    .catch((err) => console.error(err));
};

const getMovieByName = async (req, res) => {
  const name = req.params.name;
  const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`;

  await fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data.results[0]))
    .catch((err) => console.error(err));
};

module.exports = {
  getTrend,
  getTop,
  getComing,
  getByIdInfo,
  getByIdImg,
  getByIdVid,
  getMoiveSimiliarbyId,
  getMovieByName,
};
