import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const textMessageContoller=async (req,res) =>{ // MESSAGE BY AI
    try{
        const userId=req.user._id;
        const {chatId, prompt}=req.body;

        const chat=await Chat.findOne({userId, _id:chatId});
        chat.messages.push({role:"user", content:prompt, timestamp:Date.now(), isImage:false});

        const {choices} = await openai.chat.completions.create({
            model: "gemini-3.5-flash",
            messages: [
              
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        const reply={...choices[0].message, timestamp:Date.now(), isImage:false }
        res.json({success:true, reply});
        chat.messages.push(reply);
        await chat.save();

        await User.updateOne({_id:userId}, {$inc : {credits:-1}});
        
    }
    catch (error){
        res.json({success:false, message:error.message});
    }
}

//Image Generation
export const imageMessageController=async(req,res)=>{
    try {
        const userId=req.user._id;
        if(req.user.credits < 2){
            return res.json({success: false, message:"Out of Credits"});
        }
        const {prompt, chatId, isPublished}=req.body;
        const chat=await Chat.findOne({userId, _id:chatId});
        chat.messages.push({
            role:"user",
            content:prompt, 
            timestamp:Date.now(), 
            isImage: false 
        });
    } catch (error) {
        
    }
}