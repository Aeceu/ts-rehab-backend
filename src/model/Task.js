const mongoose = require('mongoose')
const {Schema} = mongoose ;

const taskSchema = new Schema(
    {
        name:String,
        email:String,
        Post:[{
            title:String,
            description:String
        }]
    }
)


module.exports = mongoose.models.tasks || mongoose.model("tasks",taskSchema)