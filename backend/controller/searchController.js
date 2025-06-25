const { Tv } = require("lucide-react");

require("dotenv").config();

const getOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
  },
});

const searchQuery = async (req, res) => {
  const { query } = req.params;
  try {
    let url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;
    let promise;
    promise = await fetch(url, getOptions());
    const MovieData = await promise.json();
    url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;
    promise = await fetch(url, getOptions());
    const TvData = await promise.json();
    let results = [...MovieData.results, ...TvData.results];
    let temp = [];
    results = results.filter((item) => {
      if (temp.includes(item.id)) {
        return false;
      }
      temp.push(item.id);
      return true;
    });

    res.json({ result: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { searchQuery };
