import { useParams } from "react-router";
import { useState, useEffect } from "react";
import "./Move_page.css";
import "../../components/Home-page-components/Header_move";
import Header_move from "../../components/Home-page-components/Header_move";
import Movies_service from "../../service/Movies_service";
import Tv_service from "../../service/Tv_service";
import Slider from "react-slick";
const Movie_page = () => {
  const [Details, setDetails] = useState(null);
  const [Videos, setVideos] = useState(null);
  const [Loading, setLoading] = useState(true);
  const { id, type } = useParams();
  const baseImg = "https://image.tmdb.org/t/p/original";
  const baseVid = "https://www.youtube.com/embed/";

  const setting = {
    infinite: true,
    slidesToShow: 2,
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
        } else if (type === "tv") {
          temp = await Tv_service.getTvDetails(id);
          setDetails(temp);
          temp = await Tv_service.getTvVid(id);
          setVideos(temp);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }; //end of function
    setLoading(true);
    load_movie();
  };

  useEffect(getMove_pg, []);

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
        <Slider {...setting}>
          <img
            src={baseImg + Details.poster_path}
            width={450}
            height={500}
            className="Movieimg"
          ></img>

          {Videos.map((vid_id) => (
            <iframe
              width="450"
              height="500"
              src={baseVid + vid_id}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              className="Movieimg"
            ></iframe>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Movie_page;
