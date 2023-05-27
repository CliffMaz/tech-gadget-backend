import express from "express";

import tokenVerify from "../middlewares/tokenVerify.js";
import Order from "../model/Order.js";

const orderRoutes = express.Router();

//get all orders from the db
orderRoutes.get("/all", tokenVerify, async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "orderBy",
      model: "User",
    });

    orders.forEach((item) => {
      item.orderBy.password = undefined;
    });

    res.status(200).send(orders);
  } catch (err) {
    res.status(400).send("couldnt get Orders");
  }
});

//get order by user id
orderRoutes.get("/:id", tokenVerify, async (req, res) => {
  try {
    const orders = await Order.find({ orderBy: req.params.id }).populate({
      path: "orderBy",
      model: "User",
    });
    //to put an if statement later on
    orders.forEach((item) => {
      item.orderBy.password = undefined;
    });

    res.status(200).send(orders);
  } catch (err) {
    res.status(400).send("couldnt get Orders");
  }
});

//add a new order to the database
orderRoutes.post("/add", async (req, res) => {
  const newOrder = Order({
    orderBy: req.body.orderBy,
    orderItems: req.body.orderItems,
    shippingAddress: req.body.shippingAddress,
    totalPrice: req.body.totalPrice,
    shippingType: req.body.shippingType,
  });

  try {
    const savedOrder = await newOrder.save();

    res.status(200).send(savedOrder);
  } catch (err) {
    res.status(200).send({
      feedback: "failed to create order",
      err,
    });
  }
});

//update order details from the database
orderRoutes.put("/update", async (req, res) => {
  let order = "";
  const newOrder = {
    orderItems: req.body.orderItems,
    orderStatus: req.body.orderStatus,
    shippingAddress: req.body.shippingAddress,
    isPaid: req.body.isPaid,
    paidAt: req.body.paidAt,
    totalPrice: req.body.totalPrice,
    shippingType: req.body.shippingType,
  };

  try {
    order = await Order.findOneAndUpdate(
      { _id: req.body._id },
      { $set: newOrder },
      {
        new: true,
      }
    );

    res.status(200).send(savedOrder);
  } catch (err) {
    res.status(200).send({
      feedback: "failed to create order",
      err,
      order,
    });
  }
});

//delete an order from the database
orderRoutes.put("/delete", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.body._id);
    res.status(200).send({ feedback: "deleted successfully" });
  } catch (err) {
    res.status(400).send({ feedback: "failed to delete order", err });
  }
});

//get a order by id
orderRoutes.get("/:id", tokenVerify, async (req, res) => {
  const id = req.params;
  try {
    const order = await Order.findById(id);
    res.status(200).send(order);
  } catch (err) {
    res.status(400).send({
      feedback: "failed to get the order by provided id",
      id: id.id,
    });
  }
});

export default orderRoutes;
