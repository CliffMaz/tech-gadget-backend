import express from "express";
import Cart from "../model/Cart.js";

const cartRoutes = express.Router();

//get all cart from the db
cartRoutes.get("/all", async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).send(cart);
  } catch (err) {
    res.status.send({ feedback: "cannot find carts" });
  }
});

//add a new cart to the database
cartRoutes.post("/add", async (req, res) => {
  const cart = Cart({
    orderby: req.body.userId,
    products: req.body.products,
    cartTotal: req.body.cartTotal,
  });

  try {
    const savedCart = await cart.save();
    res.status(200).send(savedCart);
  } catch (err) {
    res.status.send({ feedback: "failed to created a new cart", err });
  }
});

//update cart details from the database
cartRoutes.put("/update", async (req, res) => {
  let updated = "";

  const cart = {
    orderby: req.body.userId,
    products: req.body.products,
    cartTotal: req.body.cartTotal,
  };

  try {
    updated = await Cart.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: cart },
      {
        new: true,
      }
    );

    res.status(200).send(updated);
  } catch (err) {
    res.status(400).send({ feedback: "failed to update cart", err });
  }
});

//delete an cart from the database
cartRoutes.put("/delete", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.body._id);
    res.status(200).send({ feedback: "deleted successfully" });
  } catch (err) {
    res.status(400).send({ feedback: "failed to delete category", err });
  }
});

//get a cart by id
cartRoutes.get("/:id", async (req, res) => {
  const id = req.params;
  try {
    const cart = await Cart.findById(id);
    res.status(200).send(cart);
  } catch (err) {
    res.status(400).send({
      feedback: "failed to get the category by provided id",
      id: id.id,
    });
  }
});

export default cartRoutes;
