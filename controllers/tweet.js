const {Follower} = require("../models/follower");
const {Tweet} = require("../models/tweet");
const {User} = require("../models/user");

// Create a new tweet
const createTweet = async (req, res) => {
   try {
      const {userId, content} = req.body;
      const newTweet = new Tweet({userId, content});
      await newTweet.save();
      res.status(201).json(newTweet);
   } catch (error) {
      res.status(500).json({error: "An error occurred"});
   }
};

// Get all tweet
const getTweet = async (req, res) => {
   try {
      const Id = req.params.id;
      // console.log("sss", Id);
      const follower = await Follower.findOne({followerId: Id});
      // console.log("ff", follower);

      // const following = follower ? follower.followingIds : [];
      if (!follower) {
         return res.status(201).json([]);
      }
      const tweets = await Tweet.find({userId: {$in: follower.followingIds}})
         .sort({createdAt: -1})
         .populate("userId");

      res.json(tweets);
      // console.log("tt", tweets);
   } catch (error) {
      res.status(500).json({error: "An error occurred"});
   }
};

// Update a tweet
const updateTweet = async (req, res) => {
   const ID = req.params.id;
   console.log(ID);
   try {
      let data = await Tweet.findByIdAndUpdate({_id: ID}, req.body);
      console.log(data);
      res.status(200).send(data);
   } catch (err) {
      console.log({msg: "Error Occured", error: err});
   }
};

// Delete a tweet
const deleteTweet = async (req, res) => {
   try {
      const ID = req.params.id;
      console.log(ID);
      await Tweet.findByIdAndDelete({_id: ID});
      res.json({message: "Tweet deleted successfully"});
   } catch (error) {
      res.status(500).json({error: "An error occurred"});
   }
};

// Follow a user
const follow = async (req, res) => {
   try {
      const {followerId, followingId} = req.params;
      // Create a follower  if not exists
      await Follower.findOneAndUpdate(
         {followerId},
         {$addToSet: {followingIds: followingId}},
         {upsert: true}
      );
      res.json({message: "User followed successfully"});
   } catch (error) {
      res.status(500).json({error: "An error occurred"});
   }
};

// Unfollow a user
const unfollow = async (req, res) => {
   try {
      const {followerId, followingId} = req.params;
      await Follower.findOneAndUpdate({followerId}, {$pull: {followingIds: followingId}});
      res.json({message: "User unfollowed successfully"});
   } catch (error) {
      res.status(500).json({error: "An error occurred"});
   }
};

const following = async (req, res) => {
   try {
      const Id = req.params.id;
      console.log(Id);
      const follower = await Follower.findOne({followerId: Id}).populate(
         "followingIds",
         "username"
      );
      const following = follower ? follower.followingIds : [];
      res.json({following});
   } catch (error) {
      res.status(500).json({error: "An error occurred"});
   }
};
const followingcount = async (req, res) => {
   try {
      const {userId} = req.params;
      const follower = await Follower.findOne({followerId: userId});
      const followingCount = follower ? follower.followingIds.length : 0;
      res.json({followingCount});
   } catch (error) {
      res.status(500).json({error: "An error occurred"});
   }
};

const mytweets = async (req, res) => {
   try {
      const Id = req.params.id;
      console.log(Id);
      const tweets = await Tweet.find({userId: Id}).sort({createdAt: -1});
      res.json(tweets);
   } catch (error) {
      res.status(500).json({error: "An error occurred"});
   }
};
const getname = async (req, res) => {
   try {
      const Id = req.params.id;
      const user = await User.findOne({_id: Id});
      console.log("user", user.username);
      if (!user) {
         return res.status(404).json({error: "User not found"});
      }
      res.json(user);
   } catch (error) {
      res.status(500).json({error: "An error occurred"});
   }
};

module.exports = {
   createTweet: createTweet,
   updateTweet: updateTweet,
   deleteTweet: deleteTweet,
   getTweet: getTweet,
   follow: follow,
   unfollow: unfollow,
   following: following,
   followingcount: followingcount,
   mytweets: mytweets,
   getname: getname
};
