const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
const origins = ['http://localhost:5173', 'http://10.0.0.26:5173']
app.use(cors({
    origin: function (origin, callback) {
    if (!origin || origins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))



const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  },
  {
    "id": 10759,
    "name": "Action & Adventure"
  },
  {
    "id": 10762,
    "name": "Kids"
  },
  {
    "id": 10763,
    "name": "News"
  },
  {
    "id": 10764,
    "name": "Reality"
  },
  {
    "id": 10765,
    "name": "Sci-Fi & Fantasy"
  },
  {
    "id": 10766,
    "name": "Soap"
  },
  {
    "id": 10767,
    "name": "Talk"
  },
  {
    "id": 10768,
    "name": "War & Politics"
  }
]




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

    app.get('/api/genre',(request,response)=>{
      response.json(genres)
    })



  const PORT = 3001
  app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
  })
  