import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "username is required"]
    },
    email:{
        type:String,
        unique:true,
        required:[true, "email is required"]
    },
    password:{
        type: String,
        required:[true, "password is required"],
        select:false
    }
})

const userModel = mongoose.model('user', userSchema);

export default userModel;