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


router.post("/", async (req, res) => {
  try {
    const { id, randomTasks } = req.body;
    const userID = await User.findOne({"_id":new Types.ObjectId(id)})

    if (userID && userID.uncomplete_task.length === 0) {
      const user = await User.findOneAndUpdate(
        { "_id":new Types.ObjectId(id) },
        { $push: { uncomplete_task: { $each: randomTasks } } },
        { new: true, upsert: true }
      );
      return res.send({message:"Task successfully added"});
    }
    return res.send({message:"already had tasks!"})
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;