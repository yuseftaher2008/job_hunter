import  express  from "express";
import type {Express,Request,Response} from 'express'
import "dotenv/config";

const app : Express = express()
const PORT  = process.env.PORT || 3000

app.get('/',(req:Request,res:Response)=> {
    res.json(`runing`)
})

app.listen(PORT,()=> console.log(`runing on port ${PORT}`))