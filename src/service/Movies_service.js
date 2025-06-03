import axios from "axios";

const getTrend = () => {
  const promise = axios.get("http://10.0.0.26:3001/api/movies/trend");
  return promise.then((v) => v.data);
};

const getTop = () => {
  const promise = axios.get("http://10.0.0.26:3001/api/movies/top");
  return promise.then((v) => v.data);
};

const getComing = () => {
  const promise = axios.get("http://10.0.0.26:3001/api/movies/coming");
  return promise.then((v) => v.data);
};

const getMovieDetails = (id) => {
  const promise = axios.get(`http://10.0.0.26:3001/api/movies/${id}/info`);
  return promise.then((v) => v.data);
};

const getMovieImg = (id) => {
  const promise = axios.get(`http://10.0.0.26:3001/api/movies/${id}/img`);
  return promise.then((v) => v.data);
};

const getMovieGenre = () => {
  const promise = axios.get("http://10.0.0.26:3001/api/genre");
  return promise.then((v) => v.data);
};

const getMovieVid = (id) => {
  const promise = axios.get(`http://10.0.0.26:3001/api/movies/${id}/vid`);
  return promise.then((v) => {
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
          trailer_count += 1;
          temp.push(vid.key);
        }
      }
    });
    v.data.results = temp;
    return v.data.results;
  });
};

const Fillter_movie_genre = (genre, genre_id) => {
  let ans = [];
  let temp = [];
  for (var g in genre_id) {
    temp = genre.filter((m) => {
      if (genre_id[g] === m.id) {
        return true;
      }
      return false;
    });
    ans = ans.concat(temp);
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
