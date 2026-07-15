import type { Request,Response } from 'express';
import { createUser,findAuthProvider,findUserByEmail, findUserById,createAuthProvider } from '../models/userModel.js';
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

export async function userLogin (req:Request,res:Response) {
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

export async function linkedinRedirect (req:Request,res:Response) {
const redirectUrl:string = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&scope=openid%20profile%20email`
res.redirect(redirectUrl)
}

export async function linkedinCallback (req:Request,res:Response) {

const code = req.query.code
try{

    const params = new URLSearchParams({
        grant_type: "authorization_code",
        code: code as string,
        client_id: process.env.LINKEDIN_CLIENT_ID as string,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET as string,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI as string
    })

    const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken",{
        method:"POST",
        body:params,
        headers:{"Content-Type": "application/x-www-form-urlencoded"}
    })
    if(!response.ok){
        return res.status(400).json({message:"invalid credentials"})
    }
    const result = await response.json()
    const profileResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
    method: "GET",
    headers: {
        Authorization: `Bearer ${result.access_token}`
    }
    
})
    if(!profileResponse.ok){
        return res.status(400).json({message:"server error"})
    }
    const profile = await profileResponse.json()
    const existingAuth = await findAuthProvider("linkedin",profile.sub)
    let user
    if(existingAuth){
        user = await findUserById(existingAuth.user_id)
    } else {
    const newUser = await createUser({
        name: profile.name,
        email: profile.email,
        
    })
    
    await createAuthProvider({
        user_id: newUser.id,
        provider: 'linkedin',
        provider_user_id: profile.sub,
        access_token: result.access_token
    })
    
    user = newUser

}
    const payload  = {id : user.id}
    const secretKey:string = process.env.JWT_SECRET as string
    const token:string = jwt.sign(payload,secretKey , {
        expiresIn: '1h'
        })    
    res.json({
        message:"user signed in throught linkedin",
        "token":token
    })    
}catch(err){
    return res.status(500).json({message : "server error"})
}
}