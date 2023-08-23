const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true
      },
      content: {
         type: String,
         required: true
      },
      createdAt: {
         type: Date,
         default: Date.now
      },
      image: {
         type: String
      }
   },
   {
      versionKey: false
   }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = {
   Tweet: Tweet
};
