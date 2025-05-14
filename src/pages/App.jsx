import { useState,useEffect,createContext, useContext } from 'react'
import Movies_service from '../service/Movies_service'
import { useNavigate } from 'react-router'
import Display_movies from '../components/Display_movies'
import axios from 'axios'
import './App.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; 
import Slider from 'react-slick'



function App() {
  const [loading,setLoading] = useState(true)
  const [trending,setTrending] = useState(null)
  const [top,setTop] = useState(null)
  const [coming,setComing] = useState(null)

   const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:true,
    focusOnSelect:true
  };

  const getHome =()=>{
      const load_movies = async()=> {
      try{
        let temp = await Movies_service.getTop()
        setTop(temp.results)
        temp = await Movies_service.getTrend()
        setTrending(temp.results)
        temp = await Movies_service.getComing()
        setComing(temp.results)
      }
      catch(err){
        console.log("Error")
      }
      finally{
        setLoading(false)
      }
    }

    setLoading(true)
    load_movies()
    }
  
  useEffect(getHome,[])

  

    useEffect(() => {
      if(loading===true){
        document.body.classList.add('my-Loadingbg')
      }
      else{
            document.body.classList.add('my-dark-bg')
      }

    return () => {
      if(loading===true){
        document.body.classList.remove('my-Loadingbg')
      }
      else{
        document.body.classList.remove('my-dark-bg')
      }

    };
    }, [loading]);
  


  if(loading===true){
    return(
      <h1 className='LoadingData'>Loading data pls wait!</h1>
    )
  }


  return (
    <>
    <div className='Movieplace'>
    <h1 className="Scrolheading">Top Movies</h1>  
    <div className='MovieSlider'>
    <Slider {...settings}>
    {top.map( n => <Display_movies key={n.id} n={n} /> )}
    </Slider>
    </div>
    </div>

    <div className='Movieplace'>
    <h1 className="Scrolheading">Trending Movies</h1>
    
    <div className='MovieSlider'>
    <Slider {...settings}>
    {trending.map( n => <Display_movies key={n.id} n={n} /> )}
    </Slider>
    </div>
    </div>
    <div className='Movieplace'>
    <h1 className="Scrolheading">Upcoming Movies</h1>
    </div>
    <div className='Movieplace'>
    <div className='MovieSlider'>
    <Slider {...settings}>
    {coming.map( n => <Display_movies key={n.id} n={n} /> )}
    </Slider>
    </div>
    </div>



    </>
  )
}

export default App
