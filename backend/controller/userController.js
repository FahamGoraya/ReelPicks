require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const db = {
  user1: {
    username: "admin",
    password: "admin12",
  },
  user2: {
    username: "user",
    password: "user12",
  },
};

const userLogin = async (req, res) => {
  const { user, password } = req.body;
  for (const key in db) {
    if (db[key].username === user && db[key].password === password) {
      const token = jwt.sign(
        { username: db[key].username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("my_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "Strict", // Prevent CSRF attacks
      });
      return res.json({
        message: "Login successful",
        success: true,
        token: token, // Optionally return the token in the response
      });
    }
  }
  res
    .status(401)
    .json({ message: "Invalid username or password", success: false });
};

const getInfo = async (req, res) => {
  username = req.user.username;
  res.json({ myName: username });

  // You can add more user information here if needed
};

const userLogout = async (req, res) => {
  console.log("User logged out");
  res.clearCookie("my_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.json({ message: "Logout successful", success: true });
};

module.exports = { userLogin, getInfo, userLogout };
