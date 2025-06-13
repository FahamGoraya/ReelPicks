import axios from "axios";

const Backend_URL = "https://gimoviesbackend.onrender.com/";

const getTvDetails = (id) => {
  return axios.get(`${Backend_URL}api/tv/${id}/info`).then((v) => v.data);
};

const getTvImg = (id) => {
  return axios.get(`${Backend_URL}api/tv/${id}/img`).then((v) => v.data);
};

const getTvSimiliarbyId = (id) => {
  return axios.get(`${Backend_URL}api/tv/${id}/similar`).then((v) => v.data);
};

const getTvVid = (id) => {
  return axios.get(`${Backend_URL}api/tv/${id}/vid`).then((v) => {
    const temp = [];
    let video_count = 0;
    // Filter videos to include only YouTube trailers and teasers
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

export default {
  getTvImg,
  getTvDetails,
  getTvVid,
  getTvSimiliarbyId,
};
