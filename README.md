# 🎬 ReelPicks

**ReelPicks** is a full-stack movie recommendation web application that helps users discover, search, and save their favorite movies. It integrates with **The Movie Database (TMDB)** API for real-time movie data, and supports secure user authentication using **JWT**. The backend is built with **Node.js**, **Express**, and **MongoDB**, while the frontend is powered by **Vite** and **React** for a fast and modern user experience.

---

## 🌟 Features

- 🔐 User authentication with JWT (Register/Login)
- 🎥 Search and explore movies via TMDB API
- 🌈 Filter movies by genre, rating, popularity, and more
- ❤️ Save favorite movies to a personal list
- 🧠 Smart movie recommendations (based on user preferences)
- ⚡ Super-fast frontend using Vite + React
- 📦 RESTful API structure for scalable development

---

## 🛠️ Tech Stack

**Frontend**
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/) (optional for styling)

**Backend**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) for authentication
- [dotenv](https://www.npmjs.com/package/dotenv) for environment config

**API Integration**
- [TMDB API](https://developer.themoviedb.org/docs)

---

## 📁 Project Structure
reelpicks/
│
├── (Vite + React)
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── vite.config.js
│
├── Backend (Node.js + Express)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ ├── config/
│ │ └── db.js
│ ├── .env
│ ├── server.js
│ └── package.json
│
├── README.md
└── .gitignore

## 🔐 Environment Variables

Create a `.env` file in the `/Backend` directory with the following values:
TMBD_API_KEY=your Key
JWT_SECRET=Your Secret
MONGO_URI=Your URI
ENCRYPTION_KEY=Your Key




