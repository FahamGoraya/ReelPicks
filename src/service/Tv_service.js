import axios from "axios";

const Backend_URL = "https://reelpicks-dnc0.onrender.com/";

const getTvDetails = (id) => {
  return axios
    .get(`${Backend_URL}api/tv/${id}/info`, {
      withCredentials: true,
    })
    .then((v) => v.data);
};

const getTvImg = (id) => {
  return axios
    .get(`${Backend_URL}api/tv/${id}/img`, {
      withCredentials: true,
    })
    .then((v) => v.data);
};

const getTvSimiliarbyId = (id) => {
  return axios
    .get(`${Backend_URL}api/tv/${id}/similar`, {
      withCredentials: true,
    })
    .then((v) => v.data);
};

const getTvVid = (id) => {
  return axios
    .get(`${Backend_URL}api/tv/${id}/vid`, {
      withCredentials: true,
    })
    .then((v) => {
      const temp = [];
      let video_count = 0;

      v.data.results.map((vid) => {
        if (
          vid.site === "YouTube" &&
          (vid.type === "Teaser" || vid.type === "Trailer") &&
          video_count < 5
        ) {
          video_count += 1;
          temp.push(vid.key);
        }
      });

      v.data.results = temp;
      return v.data.results;
    });
};

const getTvReviews = (id) => {
  return axios
    .get(`${Backend_URL}api/tv/${id}/reviews`, {
      withCredentials: true,
    })
    .then((v) => v.data);
};
export default {
  getTvImg,
  getTvDetails,
  getTvVid,
  getTvSimiliarbyId,
  getTvReviews,
};
