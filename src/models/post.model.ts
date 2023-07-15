import mongoose from "mongoose";

let PostScheme: mongoose.Schema = new mongoose.Schema({
  username: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  userProfileImage: { type: String },
  content: { type: String },
  createdAt: { type: Date, default: Date.now() },
  comments: [
    {
      userCommentedId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      userCommentedName: { type: String },
      userCommentedProfileImage: { type: String },
      commentContent: {
        type: String,
      },
      commentCreatedAt: {
        createdAt: { type: Date, default: Date.now() },
      },
    },
  ],
  likes: [
    {
      userLikedId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    },
  ],
});

const Post = mongoose.model("posts", PostScheme);
export default Post;
