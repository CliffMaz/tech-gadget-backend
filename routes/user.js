import express from "express";

const userRoutes = express.Router();

//get all users

userRoutes.get("/users", (req, res) => {
  const users = [
    { name: "cliford Mazibuko" },
    { name: "Lelo M" },
    { name: "kutloano Mofokeng" },
    { name: "Grace Mazibuko" },
    { name: "Clementine Sibs" },
  ];
  res.send(users);
});

//get user by ID
userRoutes.get("/:id", (req, res) => {});

//create a new user
userRoutes.put("/addUser", (req, res) => {});

//update a user
userRoutes.put("/updateUser", (req, res) => {});

//delete a user
userRoutes.put("/deleteUser", (req, res) => {});

export default userRoutes;
