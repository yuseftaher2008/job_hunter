import type { Request,Response } from 'express'
import { createUser } from '../models/userModel.js'
import bcrypt from 'bcrypt'

export async function userRegister (req : Request,res: Response) {
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