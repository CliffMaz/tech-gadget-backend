import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      default: "",
    },

    username: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },

    profileDisplay: {
      type: String,
      required: false,
    },

    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
