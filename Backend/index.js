import env from 'dotenv';
env.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './Routes/authRoutes.js'
import { userRouter } from './Routes/userRoutes.js';
import cors from "cors"
import productsRouter from './Routes/productsRoutes.js';
export const app = express();
app.use(cookieParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/products', productsRouter)