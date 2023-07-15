import mongoose from "mongoose";

const UserSchema: mongoose.Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  isAdmin: {
    default: false,
    type: Boolean,
  },
  userProfileImage: {
    type: String,
    default: `http://localhost:5000/public/defaults/default-user-image.svg`,
  },
  email: { type: String, unique: true },
  password: { type: String },
});

const User = mongoose.model("users", UserSchema);

export default User;
