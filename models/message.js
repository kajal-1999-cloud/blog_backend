const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
   
    
    email: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("Message", MessageSchema)