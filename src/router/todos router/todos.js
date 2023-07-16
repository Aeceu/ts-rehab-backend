const express = require("express");
const User = require('../../model/User');
const { Types } = require("mongoose");

const router = express.Router();

// get all the data from database.
router.get("/:id",async(req,res)=>{
    try {
        const id = req.params;
        const user = await User.findOne(new Types.ObjectId(id));
        res.send(user);
    } catch (error) {
        console.error(error);
    }
})

// add new todos
router.post("/",async(req,res)=>{
    try {
        const {id,Todos} = await req.body;
        const user = await User.findByIdAndUpdate(
            {"_id":new Types.ObjectId(id)},
            {$push:{Todos}},
            {new:true,upsert:true}
        )
        res.send(user)
    } catch (error) {
        console.error(error);
    }
})

// Update the CURRENT tasks of the user.
router.put("/",async(req,res)=>{
    try {
        const {id,Todos} =  await req.body;
        const user = await User.findOneAndUpdate(
            {"Todos._id":new Types.ObjectId(id)},
            {
                $set: {
                  "Todos.$.title": Todos.title,
                  "Todos.$.description": Todos.description
                }
              }
            )
            return res.send(user);
    } catch (error) {
        console.error(error);
    }
})

router.delete("/",async(req,res)=>{
    try {
        const {userID,postID} = await req.body;
        const user = await User.updateOne(
            {"_id": new Types.ObjectId(userID)},
            {"$pull":{"Todos":{"_id":new Types.ObjectId(postID)}}},
            {multi:true}
        )
        return res.send(user);
    } catch (error) {
        console.error(error);
    }
})


module.exports = router