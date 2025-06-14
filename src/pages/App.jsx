import { useState, useEffect, createContext, useContext } from "react";
import Movies_service from "../service/Movies_service";
import { useNavigate } from "react-router";
import Display_movies_with_info from "../components/Home-page-components/Display_movies_with_info";
import Display_movies_without_info from "../components/Home-page-components/Display_movies_without_info";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Header_move from "../components/Home-page-components/Header_move";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState(null);
  const [top, setTop] = useState(null);
  const [coming, setComing] = useState(null);
  const [genre, setGenre] = useState(null);

  const settingstrend = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    focusOnSelect: true,
  };
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    focusOnSelect: true,
  };

  const getHome = () => {
    const load_movies = async () => {
      try {
        let temp = await Movies_service.getTop();
        setTop(temp.results);
        temp = await Movies_service.getTrend();
        setTrending(temp.results);
        temp = await Movies_service.getComing();
        setComing(temp.results);
        temp = await Movies_service.getMovieGenre();
        setGenre(temp);
      } catch (err) {
        console.log("Error");
        navigate("/");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    load_movies();
  };

  useEffect(getHome, []);

  useEffect(() => {
    document.body.classList.add("my-dark-bg");

    return () => {
      document.body.classList.remove("my-dark-bg");
    };
  }, [loading]);

  if (loading === true) {
    return (
      <div className="LoadingDataDiv">
        <h1 className="LoadingData">Loading data!</h1>
      </div>
    );
  }

  return (
    <>
      <Header_move />
      <div className="MoveSliderdiv">
        <h1 className="MovieTypeHeading">Trending</h1>
        <Slider {...settingstrend}>
          {trending.map((result) => (
            <Display_movies_with_info
              key={result.id}
              n={result}
              genre={genre}
            />
          ))}
        </Slider>
      </div>
      <div className="movieTopSlider">
        <h1 className="movieComingHeading">Upcoming</h1>
        <Slider {...settings}>
          {coming.map((result) => (
            <Display_movies_without_info
              key={result.id}
              n={result}
              genre={genre}
            />
          ))}
        </Slider>
      </div>
      <div className="movieTopSlider">
        <h1 className="movieTopHeading">Top</h1>
        <Slider {...settings}>
          {top.map((result) => (
            <Display_movies_without_info
              key={result.id}
              n={result}
              genre={genre}
            />
          ))}
        </Slider>
      </div>
    </>
  );
}

export default App;
