import express from "express";
import { productItems } from "../data/data.js";
import { uploadPhoto } from "../middlewares/upload.js";
import Product from "../model/Product.js";

const productRoutes = express.Router();

//get all products from the db
productRoutes.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(400).send({ success: false, err });
  }
});

//get a product by id
productRoutes.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params);
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send({ success: false, err });
  }
});

//add a new product to the database
productRoutes.post("/upload", uploadPhoto.single("img"), (req, res) => {
  const imageUrl = `/assets/image/${req.file.filename}`;

  const product = new Product({
    pname: req.body.pname,
    pDesc: req.body.desc,
    stockQuantity: req.body.qauntity,
    img: imageUrl,
    price: req.body.price,
    category: req.body.category,
  });
  try {
    product.save();
    res.send({ success: true, product });
  } catch (err) {
    res.status(400).send({ success: false, err });
  }
});

//update a product from the database
productRoutes.put("/newProduct", async (req, res) => {
  const oldProduct = await User.findOne({ _id: req.body._id });
  let imageUrl = "";
  if (req.body.img === oldProduct.img) {
    imageUrl = req.body.img;
  } else {
    imageUrl = `/assets/image/${req.file.filename}`;
  }

  const product = new Product({
    pname: req.body.pname,
    pDesc: req.body.desc,
    stockQuantity: req.body.qauntity,
    img: imageUrl,
    price: req.body.price,
    category: req.body.category,
  });
  try {
    product.save();
    res.send({ success: true, product });
  } catch (err) {
    res.status(400).send({ success: false, err });
  }
});

//delete a product from the database
productRoutes.put("/deleteProduct", async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.body.img });
  } catch (err) {
    res.status(400).send({ success: false, err });
  }
});

export default productRoutes;
