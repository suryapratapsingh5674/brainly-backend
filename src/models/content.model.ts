import mongoose, { Types } from "mongoose";
import { ref } from "node:process";

const contentSchema = new mongoose.Schema({
    link:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
        required:true,
        enum:["video","image","article","audio"]
    },
    title:{
        type:String,
        required:true
    },
    tags:[{
        type:Types.ObjectId, ref:"Tag"
    }],
    userId:{
        type:Types.ObjectId, ref:"user", required:true
    }
})

const contentModel = mongoose.model("Content",contentSchema)

export default contentModel