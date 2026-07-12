import  express  from "express";
import type {Express} from 'express'
import "dotenv/config";
import { authRouter } from "./routes/authRouter.js";

const app : Express = express()
const PORT  = process.env.PORT || 3000

app.use(express.json())
app.use('/api/auth',authRouter)

app.listen(PORT,()=> console.log(`runing on port ${PORT}`))