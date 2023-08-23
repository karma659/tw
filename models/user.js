const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, "Please add the user name"]
      },
      email: {
         type: String,
         required: [true, "Please add the user email address"],
         unique: [true, "Email address already taken"]
      },
      password: {
         type: String,
         required: [true, "Please add the user password"]
      },
      createdAt: {
         type: Date,
         default: Date.now
      }
   },
   {
      versionKey: false
   }
);

const User = mongoose.model("User", userSchema);

module.exports = {
   User: User
};
