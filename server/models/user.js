import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: false }, //false as in case of google login no passwrd gets saved
  googleId: { type: String, required: false }, //false as user can login normally without google sign in
  id: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
