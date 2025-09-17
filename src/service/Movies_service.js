import axios from "axios";

const Backend_URL = "https://reelpicks-dnc0.onrender.com/";

const getTrend = () => {
  return axios
    .get(`${Backend_URL}api/movies/trend`, {
      withCredentials: true, // ✅ Added
    })
    .then((v) => v.data);
};

const getTop = () => {
  return axios
    .get(`${Backend_URL}api/movies/top`, {
      withCredentials: true,
    })
    .then((v) => v.data);
};

const getComing = () => {
  return axios
    .get(`${Backend_URL}api/movies/coming`, {
      withCredentials: true,
    })
    .then((v) => v.data);
};

const getMovieDetails = (id) => {
  return axios
    .get(`${Backend_URL}api/movies/${id}/info`, {
      withCredentials: true,
    })
    .then((v) => v.data);
};

const getMovieImg = (id) => {
  return axios
    .get(`${Backend_URL}api/movies/${id}/img`, {
      withCredentials: true,
    })
    .then((v) => v.data);
};

const getMovieGenre = () => {
  return axios
    .get(`${Backend_URL}api/genre`, {
      withCredentials: true,
    })
    .then((v) => v.data);
};

const getMovieVid = (id) => {
  return axios
    .get(`${Backend_URL}api/movies/${id}/vid`, {
      withCredentials: true,
    })
    .then((v) => {
      const temp = [];
      let trailer_count = 0;
      let teaser_count = 0;
      v.data.results.map((vid) => {
        if (
          vid.site === "YouTube" &&
          (vid.type === "Teaser" || vid.type === "Trailer")
        ) {
          if (vid.type === "Teaser" && teaser_count < 3) {
            temp.push(vid.key);
            teaser_count += 1;
          } else if (vid.type === "Trailer" && trailer_count < 3) {
            temp.push(vid.key);
            trailer_count += 1;
          }
        }
      });
      v.data.results = temp;
      return v.data.results;
    });
};

const getMoiveSimiliarbyId = (id) => {
  return axios
    .get(`${Backend_URL}api/movies/${id}/similar`, {
      withCredentials: true,
    })
    .then((v) => v.data);
};

const Fillter_movie_genre = (genre, genre_id) => {
  // Check if genre_id is valid and iterable
  if (!genre_id || !Array.isArray(genre_id) || genre_id.length === 0) {
    return [];
  }

  // Check if genre is valid
  if (!genre || !Array.isArray(genre)) {
    return [];
  }

  let ans = [];
  for (let g of genre_id) {
    const matched = genre.filter((m) => m.id === g);
    ans = ans.concat(matched);
  }
  return ans;
};

const getMovieReviews = (id) => {
  return axios
    .get(`${Backend_URL}api/movies/${id}/reviews`, {
      withCredentials: true,
    })
    .then((v) => v.data);
};

export default {
  getTrend,
  getTop,
  getComing,
  getMovieDetails,
  getMovieGenre,
  Fillter_movie_genre,
  getMovieImg,
  getMovieVid,
  getMoiveSimiliarbyId,
  getMovieReviews,
};
