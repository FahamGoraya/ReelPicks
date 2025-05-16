
import '../pages/App.css'
import { Link } from 'react-router'
import { Grid, Paper } from '@mui/material';
import Movies_service from '../service/Movies_service';

const styles = {
  paper: {
    padding: '16px',
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
};



const Display_movies = (props) =>{
    const base = "https://image.tmdb.org/t/p/original"
    const curr_genre = Movies_service.Fillter_movie_genre(props.genre,props.n.genre_ids)
    
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
        <h2 className="Moviebheadinginfo">{y}</h2>
        <h4 className='Movieinfo'>Genere: {curr_genre.map( (result,index) =>{
          return (index===curr_genre.length-1 ?`${result.name}` :` ${result.name}, `)
        } ) }</h4>
      </Grid>
    </Grid>

    )

    
}



export default Display_movies