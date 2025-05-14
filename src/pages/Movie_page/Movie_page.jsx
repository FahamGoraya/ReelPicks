import { useParams } from "react-router"
import "../App.css"
const Movie_page = ()=>{
    const {id} = useParams()

    return(
        <>
        <h3 className="Scrolheading">{id}</h3>
        </>
    )
}



export default Movie_page