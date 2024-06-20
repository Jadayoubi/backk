const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      //required: true,
    },
    last_name: {
      type: String,
     // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    },
    password: {
      type: String,
      required: true,
    },
    contact_number: {
      type: Number,
      //required: true,
    },
    Date_Of_Birth: {
      type: Date,
      //required: true,
    },
    location: {
      type: String,
      //required: true,
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDeleted: { 
      type: Boolean,
      default: false,
    },
    refreshToken: String,
    isVerified: Boolean,
  },
  { collection: "users", timestamps: true },
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
