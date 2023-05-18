import express from "express";
import { productItems } from "../data/data.js";

const productRoutes = express.Router();

//get all products from the db
productRoutes.get("/all", (req, res) => {
  res.send([...productItems]);
});

//get a product by id
productRoutes.get("/:id", (req, res) => {});

//add a new product to the database
productRoutes.post("/addProduct", (req, res) => {});

//update a product from the database
productRoutes.put("/newProduct", (req, res) => {});

//delete a product from the database
productRoutes.put("/deleteProduct", (req, res) => {});

export default productRoutes;
