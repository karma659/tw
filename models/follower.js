const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema(
   {
      followerId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true
      },
      followingIds: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
         }
      ]
   },
   {
      versionKey: false
   }
);

const Follower = mongoose.model("Follower", followerSchema);

module.exports = {
   Follower: Follower
};
