import express from 'express';
import { getPlans, purchasePlans } from '../controllers/creditControllers.js';
import {protect} from "../middleware/auth.js";


const creditRouter=express.Router();

creditRouter.get('/plan', getPlans);
creditRouter.post('/purchase', protect, purchasePlans);


export default creditRouter;