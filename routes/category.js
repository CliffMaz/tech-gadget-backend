import express from "express";

const categoryRoutes = express.Router();

//get all category from the db
categoryRoutes.get("/all", (req, res) => {
  res.send();
});

//get a category by id
categoryRoutes.get("/:id", (req, res) => {});

//add a new category to the database
categoryRoutes.post("/addCategory", (req, res) => {});

//update Category details from the database
categoryRoutes.put("/newCartegory", (req, res) => {});

//delete an category from the database
categoryRoutes.put("/deleteCategory", (req, res) => {});

export default categoryRoutes;
