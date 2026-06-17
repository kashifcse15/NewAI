import Chat from "../models/Chat.js";

export const textMessageContoller=async (requestAnimationFrame,res) =>{
    try{
        const userId=req.user._id;
        const {chatId, prompt}=req.body;

        const chat=await Chat.findOne({userId, _id:chatId});
        chat.messages.push({role:"user", content:prompt, timestamps:Date.now(), isImage:false});

    }
    catch (error){

    }
}