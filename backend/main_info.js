const express = require("express");
const User = require("./models/schema").User;
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(
  cors({
    origin: ["https://gimovies.onrender.com", "http://localhost:5173"],
    credentials: true,
  })
);
app.set("trust proxy", 1);
const mongoose = require("mongoose");
app.use(cookieParser());
const movieRoutes = require("./routes/movies");
const tvRoutes = require("./routes/tv");
const userRoutes = require("./routes/user");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

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

app.use("/api/movies", movieRoutes);
app.use("/api/tv", tvRoutes);

app.get("/api/genre", (request, response) => {
  response.json(genres);
});
app.use("/api/user", userRoutes);

app.post("/api/lol", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    name: username,
    email: email,
    password: password,
    moviesClicked: [],
  });
  if (!user) {
    return res.status(400).json({ message: "User creation failed" });
  }
  res.status(201).json({ message: "User created successfully", user });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = mongoose;
