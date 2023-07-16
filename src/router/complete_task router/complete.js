const express = require("express");
const {Types} = require('mongoose');
const User = require('../../model/User');
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


// Get the uncomplete task from user and add it on complete task
router.post("/", async (req, res) => {
  try {
    const { userID, postID } = req.body;

    const user = await User.findOne(
      { 'uncomplete_task._id': postID },
      { 'uncomplete_task.$': 1 }
    );

    const deleteTask = await User.updateOne(
      {"_id": new Types.ObjectId(userID)},
      {"$pull":{"uncomplete_task":{"_id":new Types.ObjectId(postID)}}},
      {multi:true}
  )

    if (!user) {
      return res.status(404).send('Uncompleted task not found');
    }

    const uncompletedTask = user.uncomplete_task.find(
      (task) => task._id.toString() === postID
    );

    if (!uncompletedTask) {
      return res.status(404).send('Uncompleted task not found');
    }

    const completeTodos = await User.findByIdAndUpdate(
      userID,
      { $push: { complete_task: uncompletedTask } },
      { new: true, upsert: true }
    );

    res.send(completeTodos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete("/",async(req,res)=>{
  try {
      const {userID,postID} = await req.body;
      const user = await User.updateOne(
          {"_id": new Types.ObjectId(userID)},
          {"$pull":{"complete_task":{"_id":new Types.ObjectId(postID)}}},
          {multi:true}
      )
      return res.send(user);
  } catch (error) {
      console.error(error);
  }
})

module.exports = router;