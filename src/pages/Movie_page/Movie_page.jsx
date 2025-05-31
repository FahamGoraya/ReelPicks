import { useParams } from "react-router"
import { useState,useEffect } from "react"
import "./Move_page.css"
import "../../components/Home-page-components/Header_move"
import Header_move from "../../components/Home-page-components/Header_move"
import Movies_service from "../../service/Movies_service"
const Movie_page = ()=>{
    const [Details,setDetails] = useState(null);
    const [Loading,setLoading] = useState(true);
    const {id} = useParams();



    const getMove_pg =()=>{
        const load_movie = async()=> {
        try{
          let temp = null
          temp = await Movies_service.getMovieDetails(id);
          setDetails(temp)
          console.log(Details)
  
        }
        catch(err){
          console.log(err)
        }
        finally{
          setLoading(false);
        }
      }//end of function
      setLoading(true);
      load_movie();
      }
    
    useEffect(getMove_pg,[])
    
      
    
    useEffect(() => {
        document.body.classList.add('my-dark-bg')
    return () => {
        document.body.classList.remove('my-dark-bg')
        
    };
    }, [Loading]);
    
        

  if(Loading===true){
    return(
      <div className='LoadingDataDiv'>
      <h1 className='LoadingData'>Loading data!</h1>
      </div>
    )
  }




    return(
        <>
        <Header_move/>
        
        
        </>
    )
}



export default Movie_page