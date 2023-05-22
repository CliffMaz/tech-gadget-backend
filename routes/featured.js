import express from "express";
import Featured from "../model/Featured";

const featuredRoutes = express.Router();

//get all featured from the db
featuredRoutes.get("/all", async (req, res) => {
  try {
    const featured = await Featured.find();
    res.status(200).send(featured);
  } catch (err) {
    res.status.send({ feedback: "cannot find items" });
  }
});

//add a new featured to the database
featuredRoutes.post("/add", async (req, res) => {
  const featured = Featured({
    product: req.body.productId,
  });

  try {
    const savedfeatured = await featured.save();
    res.status(200).send(savedfeatured);
  } catch (err) {
    res.status.send({ feedback: "failed to created a new featured", err });
  }
});

//delete an featured from the database
featuredRoutes.put("/delete", async (req, res) => {
  try {
    await featured.findByIdAndDelete(req.body._id);
    res.status(200).send({ feedback: "deleted successfully" });
  } catch (err) {
    res.status(400).send({ feedback: "failed to delete category", err });
  }
});

//get a featured by id
featuredRoutes.get("/:id", async (req, res) => {
  const id = req.params;
  try {
    const featured = await Featured.findById(id);
    res.status(200).send(featured);
  } catch (err) {
    res.status(400).send({
      feedback: "failed to get the featured by provided id",
      id: id.id,
    });
  }
});

export default featuredRoutes;
