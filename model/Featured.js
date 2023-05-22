import mongoose from "mongoose";

const featuredSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", featuredSchema);
