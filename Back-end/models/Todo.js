const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const todoSchema = new mongoose.Schema({
    discription:{
        type:String,
        required:true
    },
    ActivityType:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    todoBy:{
        type:ObjectId,
        ref:"User"
    }
})


module.exports = mongoose.model('Todo',todoSchema)