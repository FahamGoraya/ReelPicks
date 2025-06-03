import axios from "axios";

const getTvDetails = (id) => {
  const promise = axios.get(`http://10.0.0.26:3001/api/tv/${id}/info`);
  return promise.then((v) => v.data);
};

const getTvImg = (id) => {
  const promise = axios.get(`http://10.0.0.26:3001/api/tv/${id}/img`);
  return promise.then((v) => v.data);
};

const getTvVid = (id) => {
  const promise = axios.get(`http://10.0.0.26:3001/api/tv/${id}/vid`);
  return promise.then((v) => {
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
