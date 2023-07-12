import mongoose from "mongoose";

let PostScheme: mongoose.Schema = new mongoose.Schema({
  username: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  content: { type: String },
  createdAt: { type: Date, default: Date.now() },
  comments: [],
});

const Post = mongoose.model("posts", PostScheme);
export default Post;
