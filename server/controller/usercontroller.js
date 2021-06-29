import { User, validateUser } from "../models/user"
import jwt from 'jsonwebtoken'
import { generateAccessToken } from "./jwtauth";
const dotenv = require('dotenv');
dotenv.config();

export const registercontroller = async (req, res) => {
    console.log("register");
    const { error, value } = validateUser(req.body);
    console.log("1", req.body);
    if (error) {
        return res.status(401).json({error:"Invalid Credentials"});
    }
    let user = await User.findOne({ username: value.username });
    if (user) {
        const err = new Error('User Already Exists');
        console.log(err);
        return res.status(400).json({error:err.message})    ;
    }
    else {
        user = new User(value);
        try {
            await user.save();
        }
        catch (error) {
            console.log(error);
        }
        return res.json(user);
    }
}

export const loginController = async (req,res) => {
    console.log("login");
    const username=req.body.username;
    const user=await User.findOne({ username: username });  
    if(!user) return res.status(400).json({error:'user does not exist'});
    else{
        if(user.password != req.body.password) return res.status(400).json({error:'Invalid credentials'});
        const token = generateAccessToken(username);
        console.log("logged in",token);
        return res.status(200).json({token,username});
    }
}