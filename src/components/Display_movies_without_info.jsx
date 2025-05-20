
import '../pages/App.css'
import { Link } from 'react-router'
 

const Display_movies_without_info = (props) =>{
    const base = "https://image.tmdb.org/t/p/original"
    return (

        <Link to={`/home/${props.n.id}`}>
          <img
            src={base + props.n.poster_path}
            width={200} 
            height={350}
            className='MovieInfoimg'
          />
        </Link>
    

    )

    
}



export default Display_movies_without_info