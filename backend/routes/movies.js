const js = require("@eslint/js");
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/trend", (request, responese) => {
  const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmRmMzc3MDFjNzc4MTMwMzU1OTFiMGFkY2VkMDk4YSIsIm5iZiI6MTc0NjYyOTU0MC40Niwic3ViIjoiNjgxYjczYTQwOTEwNmVmMTgxZWYwZGZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWmCKq0ehc0nTjSth_F9Z8-rvSOKdUJmXDuLswSZuHo",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => responese.json(json))
    .catch((err) => console.error(err));
});

router.get("/top", (request, responese) => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmRmMzc3MDFjNzc4MTMwMzU1OTFiMGFkY2VkMDk4YSIsIm5iZiI6MTc0NjYyOTU0MC40Niwic3ViIjoiNjgxYjczYTQwOTEwNmVmMTgxZWYwZGZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWmCKq0ehc0nTjSth_F9Z8-rvSOKdUJmXDuLswSZuHo",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => responese.json(json))
    .catch((err) => console.error(err));
});

router.get("/coming", (request, responese) => {
  const url =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmRmMzc3MDFjNzc4MTMwMzU1OTFiMGFkY2VkMDk4YSIsIm5iZiI6MTc0NjYyOTU0MC40Niwic3ViIjoiNjgxYjczYTQwOTEwNmVmMTgxZWYwZGZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWmCKq0ehc0nTjSth_F9Z8-rvSOKdUJmXDuLswSZuHo",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => responese.json(json))
    .catch((err) => console.error(err));
});

router.get("/:id/info", (request, responese) => {
  const id = request.params.id;

  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmRmMzc3MDFjNzc4MTMwMzU1OTFiMGFkY2VkMDk4YSIsIm5iZiI6MTc0NjYyOTU0MC40Niwic3ViIjoiNjgxYjczYTQwOTEwNmVmMTgxZWYwZGZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWmCKq0ehc0nTjSth_F9Z8-rvSOKdUJmXDuLswSZuHo",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => responese.json(json))
    .catch((err) => console.error(err));
});

router.get("/:id/img", (request, responese) => {
  const id = request.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}/images`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmRmMzc3MDFjNzc4MTMwMzU1OTFiMGFkY2VkMDk4YSIsIm5iZiI6MTc0NjYyOTU0MC40Niwic3ViIjoiNjgxYjczYTQwOTEwNmVmMTgxZWYwZGZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWmCKq0ehc0nTjSth_F9Z8-rvSOKdUJmXDuLswSZuHo",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => responese.json(json))
    .catch((err) => console.error(err));
});

router.get("/:id/vid", (request, responese) => {
  const id = request.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmRmMzc3MDFjNzc4MTMwMzU1OTFiMGFkY2VkMDk4YSIsIm5iZiI6MTc0NjYyOTU0MC40Niwic3ViIjoiNjgxYjczYTQwOTEwNmVmMTgxZWYwZGZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWmCKq0ehc0nTjSth_F9Z8-rvSOKdUJmXDuLswSZuHo",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => responese.json(json))
    .catch((err) => console.error(err));
});

module.exports = router;
