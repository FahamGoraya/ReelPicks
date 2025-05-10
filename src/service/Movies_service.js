import axios from "axios"

const base_url = "http://localhost:3001/api/notes"

const getMovies=()=>{
    const promise = axios.get(base_url)
    return promise.then((v)=>v.data)
}

export default {
    getMovies:getMovies
}