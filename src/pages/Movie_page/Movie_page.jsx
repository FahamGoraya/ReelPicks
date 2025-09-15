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
import Movie_description from "../../components/MoviePageComponent/MovieDescriptionComponent";

const Movie_page = () => {
  const navigate = useNavigate();
  const [Details, setDetails] = useState(null);
  const [Videos, setVideos] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [Similar, setSimilar] = useState(null);
  const [Reviews, setReviews] = useState(null);
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
          try {
            temp = await Movies_service.getMovieReviews(id);
            setReviews(temp);
          } catch (reviewError) {
            console.warn("Failed to load movie reviews:", reviewError);
            setReviews({ total_results: 0, results: [] });
          }
        } else if (type === "tv") {
          temp = await Tv_service.getTvDetails(id);
          setDetails(temp);
          temp = await Tv_service.getTvVid(id);
          setVideos(temp);
          temp = await Tv_service.getTvSimiliarbyId(id);
          setSimilar(temp);
          try {
            temp = await Tv_service.getTvReviews(id);
            setReviews(temp);
          } catch (reviewError) {
            console.warn("Failed to load TV reviews:", reviewError);
            setReviews({ total_results: 0, results: [] });
          }
        }
      } catch (err) {
        navigate("/");
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

      <Movie_description details={Details} type={type} reviews={Reviews} />

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
