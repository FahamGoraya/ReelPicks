import axios from "axios";

const Backend_URL = "http://localhost:3001/";

const getTrend = () => {
  return axios.get(`${Backend_URL}api/movies/trend`).then((v) => v.data);
};

const getTop = () => {
  return axios.get(`${Backend_URL}api/movies/top`).then((v) => v.data);
};

const getComing = () => {
  return axios.get(`${Backend_URL}api/movies/coming`).then((v) => v.data);
};

const getMovieDetails = (id) => {
  return axios.get(`${Backend_URL}api/movies/${id}/info`).then((v) => v.data);
};

const getMovieImg = (id) => {
  return axios.get(`${Backend_URL}api/movies/${id}/img`).then((v) => v.data);
};

const getMovieGenre = () => {
  return axios.get(`${Backend_URL}api/genre`).then((v) => v.data);
};

const getMovieVid = (id) => {
  return axios.get(`${Backend_URL}api/movies/${id}/vid`).then((v) => {
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

const Fillter_movie_genre = (genre, genre_id) => {
  let ans = [];
  for (let g of genre_id) {
    const matched = genre.filter((m) => m.id === g);
    ans = ans.concat(matched);
  }
  return ans;
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
};
