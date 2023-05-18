import express from "express";

const orderRoutes = express.Router();

//get all products from the db
orderRoutes.get("/all", (req, res) => {
  res.send();
});

//get a order by id
orderRoutes.get("/:id", (req, res) => {});

//add a new order to the database
orderRoutes.post("/addOrder", (req, res) => {});

//update order details from the database
orderRoutes.put("/newOrder", (req, res) => {});

//delete an order from the database
orderRoutes.put("/deleteOrder", (req, res) => {});

export default orderRoutes;
