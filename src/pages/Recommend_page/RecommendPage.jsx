import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RecommendPage.css";
import "./WatchPrompt.css";
import Header_move from "../../components/Home-page-components/Header_move";
import axios from "axios";

const RecommendPage = () => {
  const [mode, setMode] = useState("single"); // 'single' or 'multiple'
  const [singleMovie, setSingleMovie] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [showWatchPrompt, setShowWatchPrompt] = useState(false);
  const [currentRecommendation, setCurrentRecommendation] = useState({});

  // Sample movie data - in real app, this would come from your backend
  const sampleMovies = [
    {
      id: 1,
      title: "The Dark Knight",
      year: 2008,
      genre: "action",
      poster:
        "https://via.placeholder.com/200x300/1a1a1a/60a5fa?text=The+Dark+Knight",
    },
    {
      id: 2,
      title: "Inception",
      year: 2010,
      genre: "action",
      poster:
        "https://via.placeholder.com/200x300/1a1a1a/a78bfa?text=Inception",
    },
    {
      id: 3,
      title: "The Shawshank Redemption",
      year: 1994,
      genre: "drama",
      poster:
        "https://via.placeholder.com/200x300/1a1a1a/f472b6?text=Shawshank",
    },
    {
      id: 4,
      title: "Pulp Fiction",
      year: 1994,
      genre: "drama",
      poster:
        "https://via.placeholder.com/200x300/1a1a1a/60a5fa?text=Pulp+Fiction",
    },
    {
      id: 5,
      title: "The Matrix",
      year: 1999,
      genre: "action",
      poster:
        "https://via.placeholder.com/200x300/1a1a1a/a78bfa?text=The+Matrix",
    },
    {
      id: 6,
      title: "Forrest Gump",
      year: 1994,
      genre: "drama",
      poster:
        "https://via.placeholder.com/200x300/1a1a1a/f472b6?text=Forrest+Gump",
    },
    {
      id: 7,
      title: "Interstellar",
      year: 2014,
      genre: "sci-fi",
      poster:
        "https://via.placeholder.com/200x300/1a1a1a/60a5fa?text=Interstellar",
    },
    {
      id: 8,
      title: "The Godfather",
      year: 1972,
      genre: "drama",
      poster:
        "https://via.placeholder.com/200x300/1a1a1a/a78bfa?text=The+Godfather",
    },
    {
      id: 9,
      title: "Goodfellas",
      year: 1990,
      genre: "drama",
      poster:
        "https://via.placeholder.com/200x300/1a1a1a/f472b6?text=Goodfellas",
    },
    {
      id: 10,
      title: "Blade Runner 2049",
      year: 2017,
      genre: "sci-fi",
      poster:
        "https://via.placeholder.com/200x300/1a1a1a/60a5fa?text=Blade+Runner",
    },
    {
      id: 11,
      title: "Mad Max: Fury Road",
      year: 2015,
      genre: "action",
      poster: "https://via.placeholder.com/200x300/1a1a1a/a78bfa?text=Mad+Max",
    },
    {
      id: 12,
      title: "Her",
      year: 2013,
      genre: "romance",
      poster: "https://via.placeholder.com/200x300/1a1a1a/f472b6?text=Her",
    },
    {
      id: 13,
      title: "La La Land",
      year: 2016,
      genre: "romance",
      poster:
        "https://via.placeholder.com/200x300/1a1a1a/60a5fa?text=La+La+Land",
    },
    {
      id: 14,
      title: "The Grand Budapest Hotel",
      year: 2014,
      genre: "comedy",
      poster:
        "https://via.placeholder.com/200x300/1a1a1a/a78bfa?text=Grand+Budapest",
    },
    {
      id: 15,
      title: "Parasite",
      year: 2019,
      genre: "thriller",
      poster: "https://via.placeholder.com/200x300/1a1a1a/f472b6?text=Parasite",
    },
    {
      id: 16,
      title: "Get Out",
      year: 2017,
      genre: "thriller",
      poster: "https://via.placeholder.com/200x300/1a1a1a/60a5fa?text=Get+Out",
    },
  ];

  const genres = [
    "all",
    "action",
    "drama",
    "sci-fi",
    "romance",
    "comedy",
    "thriller",
  ];

  // Filter movies based on selected genre
  const filteredMovies =
    selectedGenre === "all"
      ? sampleMovies
      : sampleMovies.filter((movie) => movie.genre === selectedGenre);

  const handleMovieSelect = (movie) => {
    if (selectedMovies.find((m) => m.id === movie.id)) {
      setSelectedMovies(selectedMovies.filter((m) => m.id !== movie.id));
    } else if (selectedMovies.length < 5) {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  const navigate = useNavigate();
  const handleGetRecommendations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/api/recommend", {
        singleMovie: singleMovie,
        previous: previous,
      });
      setPrevious((prev) => prev.concat(response.data.Movie));
      const promise = await fetch(
        `http://localhost:3001/api/movies/search/${response.data.Movie}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const results = await promise.json();
      const image = "https://image.tmdb.org/t/p/original" + results.poster_path;
      console.log("Results:", results);
      setCurrentRecommendation({
        name: response.data.Movie,
        image: image,
        id: results.id,
      });
      setShowWatchPrompt(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlreadyWatched = async () => {
    setShowWatchPrompt(false);
    await handleGetRecommendations();
  };

  const handleNotWatched = () => {
    navigate(`/home/${currentRecommendation.id}/movie`);
    setShowWatchPrompt(false);
  };

  const canGetRecommendations = () => {
    if (mode === "single") {
      return singleMovie.trim().length > 0;
    } else {
      return selectedMovies.length > 0;
    }
  };

  return (
    <div className="my-dark-bg">
      <Header_move />
      <div className="recommend-container">
        <div className="recommend-header">
          <h1 className="recommend-title">Movie Recommendations</h1>
          <p className="recommend-subtitle">
            Discover your next favorite movie powered by AI. Choose a single
            movie you love or select multiple films to get personalized
            recommendations.
          </p>
        </div>

        <div className="mode-selection">
          <button
            className={`mode-button ${mode === "single" ? "active" : ""}`}
            onClick={() => setMode("single")}
          >
            Single Movie
          </button>
          <button
            className={`mode-button ${mode === "multiple" ? "active" : ""}`}
            onClick={() => setMode("multiple")}
            disabled={true}
          >
            Multiple Movies (Coming Soon)
          </button>
        </div>

        {mode === "single" && (
          <div className="single-movie-section">
            <div className="input-group">
              <label className="input-label">Enter a movie you enjoyed:</label>
              <input
                type="text"
                className="movie-input"
                placeholder="e.g., The Dark Knight, Inception, Pulp Fiction..."
                value={singleMovie}
                onChange={(e) => setSingleMovie(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* {mode === "multiple" && (
          <div className="multiple-movies-section">
            <div className="input-group">
              <label className="input-label">
                Select movies you enjoyed (up to 5):
              </label>
              {selectedMovies.length > 0 && (
                <div className="selected-count">
                  {selectedMovies.length}/5 movies selected
                </div>
              )}
            </div>

            <div className="genre-filter">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`genre-tag ${
                    selectedGenre === genre ? "active" : ""
                  }`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </button>
              ))}
            </div>

            <div className="movies-grid">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className={`movie-card ${
                    selectedMovies.find((m) => m.id === movie.id)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleMovieSelect(movie)}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movie-card-image"
                  />
                  <h3 className="movie-card-title">{movie.title}</h3>
                  <p className="movie-card-year">{movie.year}</p>
                </div>
              ))}
            </div>
          </div>
        )} */}

        <button
          className="recommend-button"
          onClick={handleGetRecommendations}
          disabled={!canGetRecommendations() || isLoading}
        >
          {isLoading && <span className="loading-spinner"></span>}
          {isLoading ? "Getting Recommendations..." : "Get AI Recommendations"}
        </button>

        {/* Watch Prompt Modal */}
        {showWatchPrompt && (
          <div className="watch-prompt-overlay">
            <div className="watch-prompt-modal">
              <h3 className="watch-prompt-title">
                {`We recommend: ${currentRecommendation.name}`}
                <img
                  src={currentRecommendation.image}
                  className="watch-prompt-poster"
                />
              </h3>
              <p className="watch-prompt-question">
                Have you already watched this movie?
              </p>
              <div className="watch-prompt-buttons">
                <button
                  className="watch-prompt-button yes-button"
                  onClick={handleAlreadyWatched}
                >
                  Yes, I've watched it
                </button>
                <button
                  className="watch-prompt-button no-button"
                  onClick={handleNotWatched}
                >
                  No, I haven't watched it
                </button>
              </div>
            </div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="recommendations-section">
            <h2 className="recommendations-title">
              Your Personalized Recommendations
            </h2>
            <div className="recommendations-grid">
              {recommendations.map((rec) => (
                <div key={rec.id} className="recommendation-card">
                  <img src={rec.poster} alt={rec.title} height={100} />
                  <h3 className="recommendation-title">{rec.title}</h3>
                  <p className="recommendation-year">{rec.year}</p>
                  <p className="recommendation-reason">"{rec.reason}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendPage;
