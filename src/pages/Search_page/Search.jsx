import { useState, useEffect } from "react";
import { Search, Filter, Star, Calendar, Clock } from "lucide-react";
import "./SearchPage.css";
import Header_move from "../../components/Home-page-components/Header_move";
import crypto from "crypto";
import { Link, useNavigate } from "react-router";

const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  // Search function
  const searchMovies = async (query) => {
    setLoading(true);
    setHasSearched(true);
    try {
      let response = await fetch(
        `https://reelpicks-dnc0.onrender.com//api/search/${query}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const results = await response.json();

      // Handle the API response structure
      const movies = results.result || [];
      setSearchResults(movies);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const Handle_search = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      searchMovies(searchQuery);
    }, 550);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Filter and sort results
  useEffect(() => {
    let filtered = [...searchResults];

    // Genre filter
    if (selectedGenre) {
      filtered = filtered.filter(
        (movie) =>
          movie.genre_ids && movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(
        (movie) => movie.vote_average && movie.vote_average >= minRating
      );
    }

    // Sort
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
        break;
      case "year":
        filtered.sort((a, b) => {
          const dateA = a.release_date ? new Date(a.release_date) : new Date(0);
          const dateB = b.release_date ? new Date(b.release_date) : new Date(0);
          return dateB - dateA;
        });
        break;
      case "title":
        filtered.sort((a, b) =>
          (a.title || a.name || "").localeCompare(b.title || b.name || "")
        );
        break;
      case "popularity":
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredResults(filtered);
  }, [searchResults, selectedGenre, sortBy, minRating]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchMovies(searchQuery);
    }
  };

  const getMovieGenres = (genreIds) => {
    if (!genreIds || !Array.isArray(genreIds)) return "";
    return genreIds
      .map((id) => genres[id])
      .filter(Boolean)
      .join(", ");
  };

  const handleNavigation = (id) => {
    console.log("Navigating to:", id);
    navigate(`/home/${id.id}/${id.media_type === "movie" ? "movie" : "tv"}`);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  const formatReleaseYear = (releaseDate) => {
    if (!releaseDate) return "Unknown";
    try {
      return new Date(releaseDate).getFullYear();
    } catch {
      return "Unknown";
    }
  };

  const formatRating = (rating) => {
    if (!rating && rating !== 0) return "N/A";
    return rating.toFixed(1);
  };

  useEffect(() => {
    document.body.classList.add("my-dark-bg");
    return () => {
      document.body.classList.remove("my-dark-bg");
    };
  }, []);

  return (
    <>
      <Header_move />
      <div className="search-container">
        <div className="search-header">
          <h1 className="search-title">Search Anything</h1>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search for media..."
              value={searchQuery}
              onChange={Handle_search}
            />
          </div>
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
          <button
            type="button"
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
          </button>
        </form>

        <div className={`filters-panel ${!showFilters ? "hidden" : ""}`}>
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Genre</label>
              <select
                className="filter-select"
                value={selectedGenre}
                onChange={handleGenreChange}
              >
                <option value="">All Genres</option>
                {Object.entries(genres).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="year">Release Year</option>
                <option value="title">Title</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                Minimum Rating:{" "}
                <span className="rating-display">
                  {minRating.toFixed(1)} ⭐
                </span>
              </label>
              <input
                type="range"
                className="filter-range"
                min="0"
                max="10"
                step="0.1"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="results-section">
          {loading && (
            <div className="loading-text">
              <div className="loading-spinner"></div>
              Searching for media...
            </div>
          )}

          {!loading && hasSearched && (
            <div className="results-header">
              <div className="results-count">
                {filteredResults.length}{" "}
                {filteredResults.length === 1 ? "result" : "results"} found, Not
                all results are shown, To get specfic result, try a more specfic
                search.
              </div>
            </div>
          )}

          {!loading && !hasSearched && (
            <div className="search-suggestion">
              Enter a media title or keyword to start searching
            </div>
          )}

          {!loading &&
            hasSearched &&
            searchResults.length === 0 &&
            searchQuery && (
              <div className="no-results">
                No media found for "{searchQuery}". Try different keywords or
                check your spelling.
              </div>
            )}

          {!loading &&
            hasSearched &&
            searchResults.length > 0 &&
            filteredResults.length === 0 && (
              <div className="no-results">
                No media match your current filters. Try adjusting your search
                criteria.
              </div>
            )}

          {!loading && filteredResults.length > 0 && (
            <div key={2} className="results-grid">
              {filteredResults.map((movie) => (
                <div
                  className="movie-card"
                  onClick={() => handleNavigation(movie)}
                >
                  {movie.poster_path ? (
                    <img
                      src={getImageUrl(movie.poster_path)}
                      alt={movie.title || "Movie poster"}
                      className="movie-poster"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}

                  <div
                    className="movie-poster no-image"
                    style={{ display: movie.poster_path ? "none" : "flex" }}
                  >
                    No Image Available
                  </div>

                  <div className="movie-info">
                    <h3 className="movie-title">
                      {movie.title || movie.name || "Untitled"}
                    </h3>

                    <div className="movie-meta">
                      <div className="movie-rating">
                        <Star size={16} fill="currentColor" />
                        {formatRating(movie.vote_average)}
                      </div>
                      <div className="movie-year">
                        <Calendar size={16} />
                        {formatReleaseYear(movie.release_date)}
                      </div>
                      {movie.runtime && (
                        <div className="movie-runtime">
                          <Clock size={16} />
                          {formatRuntime(movie.runtime)}
                        </div>
                      )}
                    </div>

                    {movie.genre_ids && movie.genre_ids.length > 0 && (
                      <div className="movie-genres">
                        {getMovieGenres(movie.genre_ids)}
                      </div>
                    )}

                    {movie.overview && (
                      <p className="movie-overview">{movie.overview}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
