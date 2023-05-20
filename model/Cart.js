import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  orderby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      quantity: Number,
      subTotal: Number,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  cartTotal: Number,
});

export default mongoose.model("Cart", cartSchema);
