import  Jwt  from "jsonwebtoken";
import type { Request , Response , NextFunction} from "express";
import "dotenv/config";
import type { userPayload } from "../types/requestInterface.js";

export async function isLogedIn (req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({message:"No token provided"}) // 401 for failed authenticate 
    }
    const token = authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({message:"invalid token format"})
    }

    try {
        const secretKey:string = process.env.JWT_SECRET as string
        const decoded = Jwt.verify(token,secretKey) as userPayload
        req.user = decoded
        next()
    } catch (err) {
        console.log(err)
        return res.status(401).json({message:"invalid credentials"})
    }

}