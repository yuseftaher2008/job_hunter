import type { Request,Response } from 'express';
import { createUser,findUserByEmail } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";


export async function userRegister (req:Request,res:Response) {
    let {name,email,title,experience_level,password,cv_link} = req.body
    if(!name || !email || !title || !experience_level || !password){
        return res.status(400).json({message:"all fields are required"})
    }
    
    try{
        password = await bcrypt.hash(password, 10)
        const user = await createUser({ name, email, title, experience_level, password, cv_link })
        const { password: _, ...safeUser } = user
        return res.status(201).json({ message: "user created", user: safeUser })
    }catch(err){
        return res.status(500).json({message:"server error"})
    }
}

export async function userLogin (req:Request,res:Response){
    const {email,password} = req.body
    if (!email || !password){
        return res.status(400).json({message:"all fields are required"})
    }
    try {
        const user = await findUserByEmail(email)
        if(!user){
            return res.status(400).json({message:"invaild credentials"})
        }
        const passwordVerify:boolean = await bcrypt.compare(password,user.password)
        if (!passwordVerify){
            return res.status(400).json({message:"invalid credentials"})
        }
        const payload  = {id : user.id}
        const secretKey:string = process.env.JWT_SECRET as string
        const token:string = jwt.sign(payload,secretKey , {
            expiresIn: '1h'
        })
        res.json({
            message:"user signedin",
            token : token
        })
    } catch (err) {
        return res.status(500).json({message:"server error"})
    }
}