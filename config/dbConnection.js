import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected successfully....", conn.connection.host);
  } catch (err) {
    console.log("Database connection failed", err);
  }
};

export default dbConnection;
