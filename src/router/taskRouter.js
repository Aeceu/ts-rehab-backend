const express = require('express');
const {Types} = require('mongoose');
const Tasks = require("../model/Task")
const router = express.Router();

// get all the data from database.
router.get("/",async(req,res)=>{
    try {
        const tasks = await Tasks.find();
        res.send(tasks);
    } catch (error) {
        console.error(error);
    }
})

// Add a new user to the database.
router.post("/",async(req,res)=>{
    try {
        const {name, email} = await  req.body;
        const tasks = await Tasks.insertMany({name,email})
        return res.send(tasks);
    } catch (error) {
        console.error(error);
    }
})

// Update the CURRENT tasks of the user.
router.put("/",async(req,res)=>{
    try {
        const {id,title,description} =  await req.body;
        const tasks = await Tasks.findOneAndUpdate(
            {"Post._id":new Types.ObjectId(id)},
            {
                $set: {
                  "Post.$.title": title,
                  "Post.$.description": description
                }
              }
            )
            return res.send(tasks);
    } catch (error) {
        console.error(error);
    }
})


// Delete the user from database.
router.delete("/",async(req,res)=>{
    try {
        const {userID} = await req.body;
        const user = await Tasks.deleteOne(new Types.ObjectId(userID));
        res.send(user);
    } catch (error) {
        console.error(error);
    }
})


module.exports = router