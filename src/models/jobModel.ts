import {pool} from "../config/db.js";

type jobData = {
    link : string
    title : string
    date : Date
    experience_level : string
}

export async function createJob (data : jobData) {
    const result = await pool.query(`INSERT INTO jobs (link,title,date,experience_level) VALUES ($1,$2,$3,$4) ON CONFLICT (link) DO NOTHING RETURNING *`,[data.link,data.title,data.date,data.experience_level])
    return result.rows[0]
}