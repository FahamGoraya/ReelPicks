import axios from "axios"


const getTrend=()=>{
    const promise = axios.get("http://localhost:3001/api/movies/trend")
    return promise.then((v)=>v.data)
}

const getTop=()=>{
    const promise = axios.get("http://localhost:3001/api/movies/top")
    return promise.then((v)=>v.data)
}

const getComing =()=>{
    const promise = axios.get("http://localhost:3001/api/movies/coming")
    return promise.then((v)=>v.data)
}

const getMovieDetails =(id)=>{
    const promise = axios.get(`http://localhost:3001/api/movies/${id}`)
    return promise.then( (v)=>v.data)
}


export default {
    getTrend,
    getTop,
    getComing,
    getMovieDetails
}