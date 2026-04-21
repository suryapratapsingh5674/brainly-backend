import mongoose from "mongoose";

async function connectDb() {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  await mongoose.connect(MONGO_URI);
  console.log("connected to db");
}

export default connectDb;
