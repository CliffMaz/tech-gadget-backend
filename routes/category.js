import express from "express";
import Category from "../model/Category.js";

const categoryRoutes = express.Router();

//get all category from the db
categoryRoutes.get("/all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (err) {
    res.status.send({ feedback: "cannot find categories" });
  }
});

//add a new category to the database
categoryRoutes.post("/add", async (req, res) => {
  const category = Category({
    title: req.body.title,
  });

  try {
    const savedCategory = await category.save();
    res.status(200).send(savedCategory);
  } catch (err) {
    res.status.send({ feedback: "failed to created a new category", err });
  }
});

//update Category details from the database
categoryRoutes.put("/update", async (req, res) => {
  let updated = "";

  try {
    updated = await Category.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: { title: req.body.title } },
      {
        new: true,
      }
    );

    res.status(200).send(updated);
  } catch (err) {
    res.status(400).send({ feedback: "failed to update category", err });
  }
});

//delete an category from the database
categoryRoutes.put("/delete", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.body._id);
    res.status(200).send({ feedback: "deleted successfully" });
  } catch (err) {
    res.status(400).send({ feedback: "failed to delete category", err });
  }
});

//get a category by id
categoryRoutes.get("/:id", async (req, res) => {
  const id = req.params;
  try {
    const category = await Category.findById(id);
    res.status(200).send(category);
  } catch (err) {
    res.status(400).send({
      feedback: "failed to get the category by provided id",
      id: id.id,
    });
  }
});

export default categoryRoutes;
