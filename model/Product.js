import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    pname: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },
    pDesc: {
      type: String,
      required: true,
      min: 3,
      max: 500,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
      min: 3,
      max: 256,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
