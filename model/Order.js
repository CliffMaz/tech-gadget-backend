import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Cancelled",
        "delivered",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
