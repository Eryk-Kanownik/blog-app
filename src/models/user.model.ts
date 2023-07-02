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
  email: { type: String, unique: true },
  password: { type: String },
});

const User = mongoose.model("users", UserSchema);

export default User;
