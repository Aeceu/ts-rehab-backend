const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.error(error);
    }
}


module.exports = connectDB