import { useState, useEffect } from "react";
import "./ReviewInfo.css";

import "../Home-page-components/Header_move";
import Slider from "react-slick";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewInfo = (reviews) => {
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

  const truncateReview = (text, maxLength = 500) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const toggleExpanded = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (reviews.total_results > 0) {
    return (
      <div className="reviews-carousel-wrapper">
        <Slider {...settings}>
          {reviews.results.map((review) => (
            <div key={review.id}>
              <div className="review-card">
                <div className="review-header">
                  <div className="review-left">
                    <div className="avatar-container">
                      {review.author_details.avatar_path ? (
                        <img
                          className="avatar"
                          src={`https://image.tmdb.org/t/p/w64_and_h64_face${review.author_details.avatar_path}`}
                          alt={`${review.author}'s avatar`}
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          {review.author.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="author-info">
                      <strong className="author-name">{review.author}</strong>
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
                      : truncateReview(review.content)
                    }
                  </p>
                </div>

                {review.content.length > 500 && (
                  <button 
                    className="read-more-btn"
                    onClick={() => toggleExpanded(review.id)}
                  >
                    {expandedReviews[review.id] ? 'Show Less' : 'Read Full Review'}
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
      <p>No reviews available yet.</p>
    </div>
  );
};

export default ReviewInfo;