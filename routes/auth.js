import express from "express";
import Joi from "@hapi/joi";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import User from "../model/User.js";
import { registerValidation, loginValidation } from "../validation.js";

const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
  //validate user input
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details).json();

  //check if user does not exist in the db
  const email = await User.findOne({ email: req.body.email });

  if (email) {
    return res
      .status(400)
      .send([
        { emailUsed: "user with email already exists", context: "emailUsed" },
      ]);
  }

  //encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  //create new user
  const user = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: hashedpassword,
  });

  //save user in the Db
  try {
    user.save();
    res.send({ success: "user created successfully", user });
  } catch (err) {
    res.status(400).send({ success: "user creation failed", err });
  }
});

authRoutes.post("/login", async (req, res) => {
  //validate user input
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details);

  //check if user is registered
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res.status(400).send([{ error: "Email or password is incorrect" }]);

  const password = user.password;

  //verify password
  const passValid = await bcrypt.compare(req.body.password, password);

  if (!passValid)
    return res.status(400).send([{ error: "Email or password is incorrect" }]);

  //provide jwt

  user.password = undefined;

  const token = jsonwebtoken.sign({ _id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: 100000,
  });

  res.header("authtoken", token).send({ token, user });
});

export default authRoutes;
