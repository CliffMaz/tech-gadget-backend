import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const conn = mongoose.Connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected successfully....");
  } catch (err) {
    console.log("Database connection failed");
  }
};

export default dbConnection;
