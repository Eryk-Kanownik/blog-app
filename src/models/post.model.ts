import mongoose from "mongoose";

let Post: mongoose.Schema = new mongoose.Schema({
  title: { type: String },
  username: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  content: { type: String },
});

export default mongoose.model("posts", Post);
