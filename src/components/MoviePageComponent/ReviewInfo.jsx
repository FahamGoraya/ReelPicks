import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewInfo.css";

import "../Home-page-components/Header_move";
import Header_move from "../Home-page-components/Header_move";
import Movies_service from "../../service/Movies_service";
import Tv_service from "../../service/Tv_service";
import Slider from "react-slick";
import Display_movies_without_info from "../Home-page-components/Display_movies_without_info";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewInfo = ({ reviews, type }) => {
  const [expandedReviews, setExpandedReviews] = useState({});

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    dotsClass: "slick-dots custom-dots",
  };

  // Helper function to truncate long reviews
  const truncateReview = (text, maxLength = 500) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Toggle expanded state for a specific review
  const toggleExpanded = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper function to get content type label
  const getContentTypeLabel = () => {
    return type === "tv" ? "TV Show" : "Movie";
  };

  // Check if reviews exist and have results
  if (!reviews) {
    return (
      <div className="no-reviews">
        <p>Loading {getContentTypeLabel().toLowerCase()} reviews...</p>
      </div>
    );
  }

  if (reviews.total_results > 0) {
    return (
      <div className="reviews-carousel-wrapper">
        <div className="reviews-header">
          <h3>
            {getContentTypeLabel()} Reviews ({reviews.total_results})
          </h3>
        </div>
        <Slider {...settings}>
          {reviews.results.map((review) => (
            <div key={review.id}>
              <div className={`review-card ${type}-review`}>
                <div className="review-header">
                  <div className="review-left">
                    <div className="avatar-container">
                      {review.author_details.avatar_path ? (
                        <img
                          className="avatar"
                          src={
                            review.author_details.avatar_path.startsWith(
                              "/https"
                            )
                              ? review.author_details.avatar_path.substring(1)
                              : `https://image.tmdb.org/t/p/w64_and_h64_face${review.author_details.avatar_path}`
                          }
                          alt={`${review.author}'s avatar`}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="avatar-placeholder"
                        style={{
                          display: review.author_details.avatar_path
                            ? "none"
                            : "flex",
                        }}
                      >
                        {review.author.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="author-info">
                      <strong className="author-name">{review.author}</strong>
                      <span className="content-type-badge">
                        {getContentTypeLabel()} Review
                      </span>
                      {review.created_at && (
                        <span className="review-date">
                          {formatDate(review.created_at)}
                        </span>
                      )}
                    </div>
                  </div>

                  {review.author_details.rating && (
                    <div className="rating-container">
                      <Rating
                        className="movie-rating"
                        style={{ maxWidth: 120 }}
                        value={(review.author_details.rating / 10) * 5}
                        readOnly
                      />
                      <span className="rating-text">
                        {(review.author_details.rating / 2).toFixed(1)}/5
                      </span>
                    </div>
                  )}
                </div>

                <div className="review-content">
                  <p>
                    {expandedReviews[review.id]
                      ? review.content
                      : truncateReview(review.content)}
                  </p>
                </div>

                {review.content.length > 500 && (
                  <button
                    className="read-more-btn"
                    onClick={() => toggleExpanded(review.id)}
                  >
                    {expandedReviews[review.id]
                      ? "Show Less"
                      : "Read Full Review"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  return (
    <div className="no-reviews">
      <p>No {getContentTypeLabel().toLowerCase()} reviews available yet.</p>
      <small>
        {type === "tv"
          ? "TV show reviews may be limited. Check back later for more user reviews!"
          : "Be the first to share your thoughts about this movie!"}
      </small>
    </div>
  );
};

export default ReviewInfo;
