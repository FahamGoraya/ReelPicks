const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

  app.get('/api/movies/trend',(request,responese) =>{
    const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmRmMzc3MDFjNzc4MTMwMzU1OTFiMGFkY2VkMDk4YSIsIm5iZiI6MTc0NjYyOTU0MC40Niwic3ViIjoiNjgxYjczYTQwOTEwNmVmMTgxZWYwZGZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWmCKq0ehc0nTjSth_F9Z8-rvSOKdUJmXDuLswSZuHo'
      }
    };

  fetch(url, options)
    .then(res => res.json())
    .then(json => responese.json(json))
    .catch(err => console.error(err));
  } )

    app.get('/api/movies/top',(request,responese) =>{
      const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmRmMzc3MDFjNzc4MTMwMzU1OTFiMGFkY2VkMDk4YSIsIm5iZiI6MTc0NjYyOTU0MC40Niwic3ViIjoiNjgxYjczYTQwOTEwNmVmMTgxZWYwZGZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWmCKq0ehc0nTjSth_F9Z8-rvSOKdUJmXDuLswSZuHo'
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(json => responese.json(json))
        .catch(err => console.error(err));


    } )

    app.get('/api/movies/coming',(request,responese) =>{
      const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmRmMzc3MDFjNzc4MTMwMzU1OTFiMGFkY2VkMDk4YSIsIm5iZiI6MTc0NjYyOTU0MC40Niwic3ViIjoiNjgxYjczYTQwOTEwNmVmMTgxZWYwZGZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWmCKq0ehc0nTjSth_F9Z8-rvSOKdUJmXDuLswSZuHo'
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(json => responese.json(json))
        .catch(err => console.error(err));
    } )

        app.get('/api/movies/:id/info',(request,responese) =>{
        const id = request.params.id

        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
        const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmRmMzc3MDFjNzc4MTMwMzU1OTFiMGFkY2VkMDk4YSIsIm5iZiI6MTc0NjYyOTU0MC40Niwic3ViIjoiNjgxYjczYTQwOTEwNmVmMTgxZWYwZGZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWmCKq0ehc0nTjSth_F9Z8-rvSOKdUJmXDuLswSZuHo'
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(json => responese.json(json))
        .catch(err => console.error(err));
    } )


      app.get('/api/movies/:id/trailer',(request,responese) =>{
        const id = request.params.id

        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
        const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmRmMzc3MDFjNzc4MTMwMzU1OTFiMGFkY2VkMDk4YSIsIm5iZiI6MTc0NjYyOTU0MC40Niwic3ViIjoiNjgxYjczYTQwOTEwNmVmMTgxZWYwZGZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oWmCKq0ehc0nTjSth_F9Z8-rvSOKdUJmXDuLswSZuHo'
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(json => responese.json(json))
        .catch(err => console.error(err));
    } )

  

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  