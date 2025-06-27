const express = require("express");
const http = require("http");
const User = require("./models/schema").User;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const server = http.createServer(app);

// Serve static files from the frontend build directory
// Update this path to match your frontend build location
app.use(express.static(path.join(__dirname, "../dist")));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Import routes
const movieRoutes = require("./routes/movies");
const tvRoutes = require("./routes/tv");
const userRoutes = require("./routes/user");
const searchRoutes = require("./routes/search");
const recommendRoutes = require("./routes/recommend");

// Genres data
const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
];

// API routes
app.use("/api/movies", movieRoutes);
app.use("/api/tv", tvRoutes);
app.use("/api/user", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/recommend", recommendRoutes);

app.get("/api/genre", (request, response) => {
  response.json(genres);
});

// Catch-all handler: send back React's index.html file for any non-API routes
// This enables client-side routing to work properly
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
