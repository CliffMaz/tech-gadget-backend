import express from "express";
import Joi from "@hapi/joi";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import User from "../model/User.js";
import { registerValidation } from "../validation.js";

const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
  //validate user input
  const { error } = registerValidation(req.body.newUser);

  if (error) return res.status(400).send(error.details[0].message);

  //check if user does not exist in the db
  const email = await User.findOne({ email: req.body.newUser.email });

  if (email) return res.status(400).send("email already exists");

  //encrypt password
  const salt = await bcrypt.genSalt(10);
  console.log(req.body.newUser.password);
  const hashedpassword = await bcrypt.hash(req.body.newUser.password, salt);

  //create new user
  const user = new User({
    fullname: req.body.newUser.fullname,
    username: req.body.newUser.username,
    email: req.body.newUser.email,
    password: hashedpassword,
  });

  //save user in the Db
  try {
    user.save();
    res.send({ success: true, user });
  } catch (err) {
    res.status(400).send({ success: false, err });
  }
});

authRoutes.post("/login", async (req, res) => {
  //validate user input
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //check if user is registered
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Email or password is incorrect");

  const password = user.password;

  //verify password
  const passValid = await bcrypt.compare(req.body.password, password);

  if (!passValid) return res.status(400).send("Email or password is incorrect");

  //provide jwt

  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: 100000,
  });

  res.header("authtoken", token).send(token);
});

export default authRoutes;
