import "dotenv/config";
import type { Request,Response } from "express";
import { createJob } from "../models/jobModel.js";




export async function addJob (req:Request,res:Response) {
    
    
    try {
        const url:string = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_APP_KEY}&what=$backend&results_per_page=10`
        const response = await fetch(url)
        if (!response.ok){
            return res.status(400).json({message:"failed to fetch jobs"})
        }
        const data = await response.json()
        console.log(data)
    } catch (err) {
        return res.status(500).json({message:"server error"})
    }
}