import {pool} from "../config/db.js"

type createUserData = {
    name:string
    email:string
    title:string
    experience_level:string
    cv_link:string
    password:string
}
export async function createUser (userData :createUserData){
    
        const addUser = await pool.query(`INSERT INTO users (name,email,title,experience_level,cv_link,password) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,[userData.name,userData.email,userData.title,userData.experience_level,userData.cv_link,userData.password])
        return addUser.rows[0]
  
  }
        
