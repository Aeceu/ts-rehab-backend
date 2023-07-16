const express = require("express");
const User = require('../model/User');
const { Types } = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const router = express.Router()


// get all the data
router.get("/", async (req,res) =>{
    try {
        const user = await User.find();
        res.send(user);
    } catch (error) {
        console.error(error);
    }
})

//get data of one user
router.get("/:id", async (req,res) =>{
  try {
      const id = req.params.id;
      const user = await User.findById(new Types.ObjectId(id));

      res.send(user);
  } catch (error) {
      console.error(error);
  }
})

// register 
router.post("/register", async (req,res) =>{
    try {
        const {email,password} = await req.body;
        const user = await User.findOne({email});

        if(user){
          return res.json({message:"User already exists!"})
        }
        
        const hashedPassword = await bcrypt.hash(password,10)
        
        const newUser = new User({email,password: hashedPassword});
        await newUser.save();
        res.send({message:"User registered Successfully! "});
    } catch (error) {
        console.error(error);
    }
})

// Login the user
router.post("/login", async(req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});

  if(!user){
    return res.json({message:"User Doesn't Exist!"})
  }

  const isPasswordValid = await bcrypt.compare(password,user.password)
  
  if(!isPasswordValid){
    return res.json({message:"Username or Password is Incorrect!"})
  }

  const token = jwt.sign({id:user._id},"secret");
  res.json({token,userID:user._id});
})

//delete user
router.delete("/", async(req,res)=>{
  try {
    const {email,password} = await req.body;
    const user = await User.findOneAndDelete({email,password});
    res.send(user)
  } catch (error) {
    console.error(error);
  }
})





module.exports = router;