
import '../pages/App.css'
import { Link } from 'react-router'
import { Grid, Paper } from '@mui/material';
import Movies_service from '../service/Movies_service';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
 



const Display_movies_with_info = (props) =>{
    const base = "https://image.tmdb.org/t/p/original"
    const curr_genre = Movies_service.Fillter_movie_genre(props.genre,props.n.genre_ids)
    const dateStr = !!!props.n.release_date ?props.n.first_air_date :props.n.release_date
    const dateObj = new Date(dateStr)
    const options = { day: '2-digit', month: 'long', year: 'numeric' }
    const formattedDate = dateObj.toLocaleDateString('en-GB', options)
    var rating = (props.n.vote_average/10) * 5
        

    let y = !!!props.n.title ?props.n.original_title :props.n.title
    if (y===undefined){
        y = !!!props.n.name ?props.n.original_name :props.n.name
    }
    
    


    return (
    <Grid container spacing={1} alignItems="center" direction='row'>
      <Grid item xs={12} sm={4}>
        
        <Link to={`/home/${props.n.id}`}>
          <img
            src={base + props.n.poster_path}
            alt={y}
            width={500} 
            height={650}
            className='MovieInfoimg'
          />
        </Link>
      </Grid>

      <Grid item xs={12} sm={8}>
        <h2 className="Moviebtitleinfo">{y}</h2>
        <h4 className='Moviebheadinginfo'>Genere: {curr_genre.map( (result,index) =>{
          return (index===curr_genre.length-1 ?`${result.name}` :` ${result.name}, `)
        } ) }</h4>
        <h4 className='Moviebheadinginfo'> Release Date: {formattedDate}</h4>
        <h4 className='Movieinfo'> Overview: {props.n.overview}</h4>
        <Rating className='MovieRating' style={{maxWidth:290}} value={rating} readOnly/>
      </Grid>
    </Grid>

    )

    
}



export default Display_movies_with_info