import express from 'express'
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.router.ts'
import contentRouter from './routers/content.router.ts'
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173", credentials: true}));

app.use('/api/auth', authRouter);
app.use('/api/content', contentRouter)

export default app;