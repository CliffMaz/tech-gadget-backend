import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import dbConnection from "./config/dbConnection.js";
import orderRoutes from "./routes/order.js";
import cartRoutes from "./routes/cart.js";
import categoryRoutes from "./routes/category.js";
import authRoutes from "./routes/auth.js";

//connection to Db
dbConnection();

//app config
const app = express();
const port = process.env.PORT || 4000;

dotenv.config();

//middleware\
app.use("/assets", express.static("./assets"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/cart", cartRoutes);

//test api
app.get("/", (req, res) => {
  console.log("app for root");
  res.send({ name: "cliford Mazibuko" });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
