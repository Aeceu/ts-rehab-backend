const express = require('express');
const {Types} = require('mongoose');
const Tasks = require("../model/Task")
const router = express.Router();


router.get("/",async(req,res)=>{
    try {
        const {email} = await req.body;
        const tasks = await Tasks.findOne({email});
        res.send(tasks)
    } catch (error) {
        console.error(error);
    }
})


// Add new tasks to the user.
router.post("/",async(req,res)=>{
    try {
        const {name,Post} = await req.body;
        const task = await Tasks.findOneAndUpdate(
            {name},
            {$push:{Post}},
            {new:true,upsert:true}
        )
        return res.send(task);
    } catch (error) {
        console.error(error);
    }
})


// Delete specific task from the user.
router.delete("/",async(req,res)=>{
    try {
        const {userID,postID} = await req.body;
        const task = await Tasks.updateOne(
            {"_id": new Types.ObjectId(userID)},
            {"$pull":{"Post":{"_id":new Types.ObjectId(postID)}}},
            {multi:true}
        )
        return res.send(task);
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;