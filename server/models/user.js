import mongoose  from "mongoose";
import Joi from 'joi' 
import { v4 as uuidv4 } from "uuid";

const userSchema=new mongoose.Schema({
    _id: {
        type: String,
        default: () => uuidv4().replace(/\-/g, ""),
      },    
    username: {type:String, required:true, minlength:3, maxlength:12, unique:true},
    password: {type:String, required:true, minlength:3, maxlength:12},
    email: {type:String, required:true, minlength:5, maxlength:255,unique:true}
},
{
    timestamps: true,
    collection: "users",
  })

export const User=mongoose.model('User', userSchema);

export const validateUser = (User) => {
    const schema = Joi.object({
        _id: Joi.string(),
        username: Joi.string().min(3).max(12).required(),
        password: Joi.string().min(3).max(12).required(),
        email: Joi.string().min(5).max(255).required().email(),
    })
    return schema.validate(User);
}

