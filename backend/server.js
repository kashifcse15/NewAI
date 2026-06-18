import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditRouter from './routes/creditRoutes.js';
import { stripeWebHooks } from './controllers/webhooks.js';

const app=express();
await connectDB();

app.post('/api/stripe', express.raw({type:'application/json'}), stripeWebHooks);

app.use(cors()); //middleware
app.use(express.json());

//Routes
app.get('/', (req,res) => res.send('Server is LIVE !!')); //routes
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('/api/credit', creditRouter);

const PORT=process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log(`Server is Running at ${PORT}`);
})