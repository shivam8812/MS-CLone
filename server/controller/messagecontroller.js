import { Message } from "../models/message"
export const getMessageController = (req,res) => {
    Message.find({roomId:req.body.roomId},(err, messages)=> {
        if(err) return res.status(400).json(err)
        return res.status(200).json(messages);
    })
}

export const postMessageController = (req,res) => {
    const message = new Message({username:req.user.username,message:req.body.message,roomId:req.body.roomId});
    message.save((err) =>{
    if(err) return res.status(500);
    return res.status(200).json(message);
  })
}