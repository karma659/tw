const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");

const signup = async (req, res) => {
   const {username, email, password} = req.body;

   try {
      const userr = await User.findOne({email});

      if (userr) {
         res.status(200).json({msg: "User exist please Login"});
      } else {
         //Hash password
         const hashedPassword = await bcrypt.hash(password, 10);

         let user = new User({username, email, password: hashedPassword});
         await user.save();

         res.status(201).json({msg: "New User registered"});
      }
   } catch (err) {
      console.log("ERROR Cant Signup", err);
      res.status(401).send({message: err});
   }
};

const login = async (req, res) => {
   const {email, password} = req.body;

   try {
      const user = await User.findOne({email});

      if (user && (await bcrypt.compare(password, user.password))) {
         const token = jwt.sign(
            {userId: user._id},
            process.env.ACCESS_TOKEN_SECERT,
            {
               expiresIn: "12h"
            }
         );

         res.setHeader("authorization", `Bearer ${token}`);
         console.log({msg: "User successfully logged in", token: token, ID: user._id});
         res.status(201).json({msg: "User successfully logged in", token: token, ID: user._id});
      } else {
         res.status(200).send({msg: "Unauthorized  Invalid email or password"});
      }
   } catch (err) {
      console.log("Error Cant Login", err);
      res.status(401).send({message: err});
   }
};

module.exports = {
   signup: signup,
   login: login
};
