import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Move_page.css";
import "../../components/Home-page-components/Header_move";
import Header_move from "../../components/Home-page-components/Header_move";
import Movies_service from "../../service/Movies_service";
import Tv_service from "../../service/Tv_service";
import Slider from "react-slick";
import Display_movies_without_info from "../../components/Home-page-components/Display_movies_without_info";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Movie_description = ({ details, type }) => {
  // Helper function to format genres
  const formatGenres = (genres) => {
    if (!genres || genres.length === 0) return "Not available";
    return genres.map((genre) => genre.name).join(", ");
  };

  // Helper function to format release date
  const formatReleaseDate = (details, type) => {
    let date;
    if (type === "movie") {
      date = details.release_date;
    } else if (type === "tv") {
      date = details.first_air_date;
    }

    if (!date) return "Not available";

    // Format the date to be more readable
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
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
            style={{ maxWidth: 150 }}
            value={(details.vote_average / 10) * 5}
            readOnly
          />
          <span className="rating-text">
            {details.vote_average
              ? `${(details.vote_average / 2).toFixed(1)}/5`
              : ""}{" "}
            ({details.vote_count ? details.vote_count.toLocaleString() : "N/A"})
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
  );
};

const Movie_page = () => {
  const navigate = useNavigate();
  const [Details, setDetails] = useState(null);
  const [Videos, setVideos] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [Similar, setSimilar] = useState(null);
  const { id, type } = useParams();
  const baseImg = "https://image.tmdb.org/t/p/original";
  const baseVid = "https://www.youtube.com/embed/";

  let settingMovie = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    focusOnSelect: true,
  };

  const settingSimiliar = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    focusOnSelect: true,
  };

  const getMove_pg = () => {
    const load_movie = async () => {
      try {
        let temp = null;
        if (type === "movie") {
          temp = await Movies_service.getMovieDetails(id);
          setDetails(temp);
          temp = await Movies_service.getMovieVid(id);
          setVideos(temp);
          temp = await Movies_service.getMoiveSimiliarbyId(id);
          setSimilar(temp);
        } else if (type === "tv") {
          temp = await Tv_service.getTvDetails(id);
          setDetails(temp);
          temp = await Tv_service.getTvVid(id);
          setVideos(temp);
          temp = await Tv_service.getTvSimiliarbyId(id);
          setSimilar(temp);
        }
      } catch (err) {
        navigate("/home");
        console.log(err);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    setLoading(true);
    load_movie();
  };

  useEffect(getMove_pg, [id, type]);

  useEffect(() => {
    document.body.classList.add("my-dark-bg");
    return () => {
      document.body.classList.remove("my-dark-bg");
    };
  }, [Loading]);

  if (Loading === true) {
    return (
      <div className="LoadingDataDiv">
        <h1 className="LoadingData">Loading data!</h1>
      </div>
    );
  } else if (Details === null) {
    return (
      <>
        <Header_move />
        <div className="LoadingDataDiv">
          <h1 className="LoadingData">Movie information not yet available!</h1>
        </div>
      </>
    );
  }

  let y = !!!Details.title ? Details.original_title : Details.title;
  if (y === undefined) {
    y = !!!Details.name ? Details.original_name : Details.name;
  }

  return (
    <>
      <Header_move />
      <h1 className="Movieheadingid">{y}</h1>
      <div className="Slider_div">
        {Videos.length != 0 && (
          <Slider {...settingMovie}>
            <img
              src={baseImg + Details.poster_path}
              width={450}
              height={500}
              className="Movieimg"
              alt={y}
            />

            {Videos.map((vid_id, index) => (
              <iframe
                key={index}
                width="450"
                height="500"
                src={baseVid + vid_id}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="Movieimg"
              />
            ))}
          </Slider>
        )}
        {Videos.length === 0 && (
          <div className="MovieCenter">
            <img
              src={baseImg + Details.poster_path}
              width={450}
              height={500}
              className="Movieimg"
              alt={y}
            />
          </div>
        )}
      </div>

      <Movie_description details={Details} type={type} />

      <h1 className="Movieheadingid">Similar To</h1>
      <div className="Similar_slider_div">
        <Slider {...settingSimiliar}>
          {Similar.results.map((result) => (
            <Display_movies_without_info key={result.id} n={result} />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Movie_page;
