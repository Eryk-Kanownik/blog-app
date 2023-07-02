import mongoose from "mongoose";

export function database() {
  try {
    mongoose.connect(process.env.MONGO_URI!).then((msg) => {
      console.log("Database Connected!");
    });
  } catch (err) {
    console.log(err);
  }
}
