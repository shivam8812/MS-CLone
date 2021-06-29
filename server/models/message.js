import { string } from "joi";
import mongoose from "mongoose";

export const Message = mongoose.model('Message', new mongoose.Schema({
        username: {type:String,required:true}, 
        message: {type:String,required:true},
        roomId:{type:String,required:true}
    })
)