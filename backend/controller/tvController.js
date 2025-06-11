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

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getTvidImg = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/tv/${id}/images`;

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

const getTvidVig = async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;

  fetch(url, getOptions())
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
};

module.exports = {
  getTvidInfo,
  getTvidImg,
  getTvidVig,
};
