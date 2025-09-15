require("dotenv").config();

const getOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
  },
});

const getTvidInfo = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;

  await fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getTvidImg = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/tv/${id}/images`;

  await fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getTvidVig = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;

  await fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getTvSimiliarbyId = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`;

  const response = await fetch(url, getOptions());
  const data = await response.json();
  let result = [];

  data.results.map((item) => {
    item.media_type = "tv";
    result.push(item);
  });
  data.results = result;
  res.json(data);
};
const getTvReviews = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1`;

  await fetch(url, getOptions())
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch TV reviews" });
    });
};

module.exports = {
  getTvidInfo,
  getTvidImg,
  getTvidVig,
  getTvSimiliarbyId,
  getTvReviews,
};
