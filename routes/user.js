import express from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs";

const userRoutes = express.Router();

//get all users

userRoutes.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send(err);
  }
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
userRoutes.put("/create", (req, res) => {
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

//update a user
userRoutes.put("/update", async (req, res) => {
  const oldUser = await User.findOne({ _id: req.body._id });
  let password = "";

  if (!oldUser) return res.status(400).send({ user: null });

  if (req.body.password === "") {
    password = oldUser.password;
  } else {
    const salt = bcrypt.genSalt(10);
    password = bcrypt.hash(res.body.password, salt);
  }

  const user = {
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: password,
  };

  console.log(oldUser, user);
  //save user in the Db
  let ne;
  try {
    ne = await user.updateOne({ _id: req.body._id }, { $push: user });

    res.send({
      success: true,
      ne,
    });
  } catch (err) {
    res.status(400).send({ success: false, ne });
  }
});

//delete a user
userRoutes.put("/delete", (req, res) => {});

export default userRoutes;
