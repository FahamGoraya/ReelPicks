import "../../pages/App.css";
import { Link } from "react-router";
import { Grid, Paper, Box, Chip, Stack } from "@mui/material";
import Movies_service from "../../service/Movies_service";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "./Display_movies_with_info.css";

const Display_movies_with_info = (props) => {
  const base = "https://image.tmdb.org/t/p/original";
  const curr_genre = Movies_service.Fillter_movie_genre(
    props.genre || [],
    props.n.genre_ids || []
  );
  const dateStr = !!!props.n.release_date
    ? props.n.first_air_date
    : props.n.release_date;
  const dateObj = new Date(dateStr);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-GB", options);
  var rating = (props.n.vote_average / 10) * 5;

  let title = !!!props.n.title ? props.n.original_title : props.n.title;
  if (title === undefined) {
    title = !!!props.n.name ? props.n.original_name : props.n.name;
  }

  const mediaType =
    props.n.media_type === undefined || props.n.media_type === "movie"
      ? "movie"
      : "tv";

  return (
    <div className="movie-card-container">
      <Paper
        elevation={0}
        className="movie-card-paper"
        sx={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <Grid container spacing={0} className="movie-card-grid">
          <Grid item xs={12} md={5} className="movie-poster-section">
            <Link
              to={`/home/${props.n.id}/${mediaType}`}
              className="movie-poster-link"
            >
              <div className="movie-poster-container">
                <img
                  src={base + props.n.poster_path}
                  alt={title}
                  className="movie-poster-image"
                />
                <div className="movie-poster-overlay">
                  <div className="play-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </Grid>

          <Grid item xs={12} md={7} className="movie-info-section">
            <Box className="movie-info-content">
              <h1 className="movie-title">{title}</h1>

              <div className="movie-rating-container">
                <Rating
                  className="movie-rating"
                  style={{ maxWidth: 150 }}
                  value={rating}
                  readOnly
                />
                <span className="rating-text">
                  {props.n.vote_average
                    ? `${(props.n.vote_average / 2).toFixed(1)}/5`
                    : "N/A"}
                </span>
              </div>

              <div className="movie-genres">
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {curr_genre && curr_genre.length > 0 ? (
                    curr_genre.map((genre, index) => (
                      <Chip
                        key={index}
                        label={genre.name}
                        size="small"
                        className="genre-chip"
                        sx={{
                          background: "linear-gradient(45deg, #60a5fa, #a78bfa)",
                          color: "white",
                          fontWeight: 500,
                          fontSize: "0.8rem",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                            transform: "translateY(-1px)",
                          },
                        }}
                      />
                    ))
                  ) : (
                    <Chip
                      label="No genres available"
                      size="small"
                      className="genre-chip"
                      sx={{
                        background: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.7)",
                        fontWeight: 500,
                        fontSize: "0.8rem",
                      }}
                    />
                  )}
                </Stack>
              </div>

              <div className="movie-release-date">
                <span className="info-label">Release Date:</span>
                <span className="info-value">{formattedDate}</span>
              </div>

              <div className="movie-overview">
                <h3 className="overview-label">Overview</h3>
                <p className="overview-text">
                  {props.n.overview || "No overview available for this title."}
                </p>
              </div>

              <div className="movie-additional-info">
                <div className="info-item">
                  <span className="info-label">Type:</span>
                  <span className="info-value media-type-badge">
                    {mediaType.toUpperCase()}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Votes:</span>
                  <span className="info-value">
                    {props.n.vote_count
                      ? props.n.vote_count.toLocaleString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Display_movies_with_info;
