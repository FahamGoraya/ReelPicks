import axios from "axios";

const Backend_URL = "http://localhost:3001/";

const getTvDetails = (id) => {
  return axios.get(`${Backend_URL}api/tv/${id}/info`).then((v) => v.data);
};

const getTvImg = (id) => {
  return axios.get(`${Backend_URL}api/tv/${id}/img`).then((v) => v.data);
};

const getTvVid = (id) => {
  return axios.get(`${Backend_URL}api/tv/${id}/vid`).then((v) => {
    const temp = [];
    v.data.results.map((vid) => {
      if (
        vid.site === "YouTube" &&
        (vid.type === "Teaser" || vid.type === "Trailer")
      ) {
        temp.push(vid.key);
      }
    });
    v.data.results = temp;
    return v.data.results;
  });
};

export default {
  getTvImg,
  getTvDetails,
  getTvVid,
};
