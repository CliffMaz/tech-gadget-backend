import express from "express";

const cartRoutes = express.Router();

//get all cart from the db
cartRoutes.get("/all", (req, res) => {
  res.send();
});

//get a cart by id
cartRoutes.get("/:id", (req, res) => {});

//add a new cart to the database
cartRoutes.post("/addCart", (req, res) => {});

//update cart details from the database
cartRoutes.put("/newCart", (req, res) => {});

//delete an cart from the database
cartRoutes.put("/deleteCart", (req, res) => {});

export default cartRoutes;