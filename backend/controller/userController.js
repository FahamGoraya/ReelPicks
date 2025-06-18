require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/schema").User;

const userLogin = async (req, res) => {
  const { user, password } = req.body;
  try {
    const userExists = await User.findOne({ email: user });
    if (userExists.email === user && userExists.password === password) {
      const token = jwt.sign({ user: userExists }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log("User logged in:", userExists.name);
      res.cookie("my_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "None", // Prevent CSRF attacks
      });
      console.log("Tokens is", token);
      return res.json({
        message: "Login successful",
        success: true,
      });
    }

    res
      .status(401)
      .json({ message: "Invalid username or password", success: false });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Invalid username or password", success: false });
  }
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
    sameSite: "None",
  });
  res.json({ message: "Logout successful", success: true });
};

const userSignup = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    name: username,
    email: email,
    password: password,
    moviesClicked: [],
  });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User creation failed" });
  }
  res
    .status(201)
    .json({ success: true, message: "User created successfully", user });
};

module.exports = { userLogin, getInfo, userLogout, userSignup };
