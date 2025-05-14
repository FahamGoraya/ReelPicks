
import '../pages/App.css'
import { Link } from 'react-router'

const Display_movies = (props) =>{
    const base = "https://image.tmdb.org/t/p/original"


    return (
        <>
        <Link to= {`/home/${props.n.id}`}>
        <img src={base+props.n.poster_path} height={600} width={400} style={{cursor:"pointer"}} />

        </Link>
        </>

    )

    
}



export default Display_movies