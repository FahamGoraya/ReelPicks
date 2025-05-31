import axios from "axios"


const getTrend=()=>{
    const promise = axios.get("http://10.0.0.26:3001/api/movies/trend")
    return promise.then((v)=>v.data)
}

const getTop=()=>{
    const promise = axios.get("http://10.0.0.26:3001/api/movies/top")
    return promise.then((v)=>v.data)
}

const getComing =()=>{
    const promise = axios.get("http://10.0.0.26:3001/api/movies/coming")
    return promise.then((v)=>v.data)
}

const getMovieDetails =(id)=>{
    const promise = axios.get(`http://10.0.0.26:3001/api/movies/${id}/info`)
    return promise.then( (v)=>v.data)
}

const getMovieGenre =()=>{
    const promise = axios.get("http://10.0.0.26:3001/api/genre")
    return promise.then( (v)=>v.data)
}

const Fillter_movie_genre=(genre,genre_id)=>{
    let ans = []
    let temp = []
    for (var g in genre_id){
        temp = genre.filter((m)=>{
            if(genre_id[g] === m.id){
                return true
            }
            return false
        })        
        ans = ans.concat(temp)
    }
    return ans

}


export default {
    getTrend,
    getTop,
    getComing,
    getMovieDetails,
    getMovieGenre,
    Fillter_movie_genre

}