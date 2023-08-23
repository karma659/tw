var express = require("express");
var app = express();
var cors = require("cors");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var connectDb = require("./models/connectionDB");
connectDb();
app.use(cors());
var port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
const path = require("path");
app.use(bodyParser.urlencoded({extended: true}));
if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "/frontend/build")));

   app.get("/", (req, res) =>
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
   );
} else {
   app.get("/", (req, res) => {
      res.send("API is running....");
   });
}

app.use("/api", router);
const {signup, login} = require("./controllers/register");
const {
   createTweet,
   updateTweet,
   deleteTweet,
   getTweet,
   follow,
   unfollow,
   followingcount,
   following,
   mytweets,
   getname
} = require("./controllers/tweet");
const {verifyToken} = require("./middlewares/authentication");

router.post("/signup", signup);
router.post("/login", login);

router.post("/tweet", verifyToken, createTweet);
router.get("/timeline/:id", verifyToken, getTweet);
router.patch("/tweet/:id", verifyToken, updateTweet);
router.delete("/tweet/:id", verifyToken, deleteTweet);
router.get("/user/:id", verifyToken, mytweets);

router.post("/follow/:followerId/:followingId", verifyToken, follow);
router.post("/unfollow/:followerId/:followingId", verifyToken, unfollow);
router.get("/following/:id", verifyToken, following);

router.get("/name/:id", verifyToken, getname);

app.listen(port, (req, res) => {
   console.log(`Server running on port ${port}`);
});
