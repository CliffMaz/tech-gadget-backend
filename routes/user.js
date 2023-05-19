import express from "express";
import User from "../model/User.js";

const userRoutes = express.Router();

//get all users

userRoutes.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).send(users);
  } catch (err) {
    res.status(404).send(err);
  }
  res.send(users);
});

//get user by ID
userRoutes.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err);
  }
});

//update a user
userRoutes.put("/updateUser", (req, res) => {});

//delete a user
userRoutes.put("/deleteUser", (req, res) => {});

export default userRoutes;
