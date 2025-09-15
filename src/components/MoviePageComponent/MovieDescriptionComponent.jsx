import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header_move from "../../components/Home-page-components/Header_move";
import Movies_service from "../../service/Movies_service";
import Tv_service from "../../service/Tv_service";
import Slider from "react-slick";
import Display_movies_without_info from "../Home-page-components/Display_movies_without_info";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ReviewInfo from "./ReviewInfo";

// Add the CSS import for proper styling
import "../../pages/Movie_page/Move_page.css";

const Movie_description = ({ details, type, reviews }) => {
  // Helper function to format genres
  const formatGenres = (genres) => {
    if (!genres || genres.length === 0) return "Not available";
    return genres.map((genre) => genre.name).join(", ");
  };

  // Helper function to format release/air date
  const formatReleaseDate = (details, type) => {
    let date;
    if (type === "movie") {
      date = details.release_date;
    } else if (type === "tv") {
      date = details.first_air_date;
    }

    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to get runtime/episode info
  const getRuntimeInfo = (details, type) => {
    if (type === "movie") {
      return details.runtime ? `${details.runtime} minutes` : "Not available";
    } else if (type === "tv") {
      const seasons = details.number_of_seasons;
      const episodes = details.number_of_episodes;
      return `${seasons} Season${
        seasons !== 1 ? "s" : ""
      }, ${episodes} Episode${episodes !== 1 ? "s" : ""}`;
    }
    return "Not available";
  };

  return (
    <div className="description-container">
      <div>
        <div className="description-item">
          <span className="description-label">Genre: </span>
          <span className="description-value">
            {formatGenres(details.genres)}
          </span>
        </div>

        <div className="description-item">
          <span className="description-label">
            {type === "movie" ? "Release Date: " : "First Air Date: "}
          </span>
          <span className="description-value">
            {formatReleaseDate(details, type)}
          </span>
        </div>

        <div className="description-item">
          <span className="description-label">
            {type === "movie" ? "Runtime: " : "Episodes: "}
          </span>
          <span className="description-value">
            {getRuntimeInfo(details, type)}
          </span>
        </div>

        <div className="description-item rating-item">
          <span className="description-label">Rating: </span>
          <div className="rating-container">
            <Rating
              className="movie-rating"
              style={{ maxWidth: 100 }}
              value={(details.vote_average / 10) * 5}
              readOnly
            />
            <span className="rating-text">
              {details.vote_average
                ? `${(details.vote_average / 2).toFixed(1)}/5`
                : ""}{" "}
              (
              {details.vote_count ? details.vote_count.toLocaleString() : "N/A"}
              )
            </span>
          </div>
        </div>

        <div className="description-item overview">
          <span className="description-label">Overview: </span>
          <p className="description-overview">
            {details.overview || "No overview available."}
          </p>
        </div>
      </div>

      <div className="review">
        <span className="description-label">
          {type === "tv" ? "TV Show Reviews: " : "Movie Reviews: "}
        </span>
        <ReviewInfo reviews={reviews} type={type} />
      </div>
    </div>
  );
};

export default Movie_description;
