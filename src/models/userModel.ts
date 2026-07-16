import {pool} from "../config/db.js";

type createUserData = {
    name:string
    email:string
    title?:string
    experience_level?:string
    cv_link?:string
    password?:string
}
type createAuthProviderData = {
    user_id:number
    provider:string
    provider_user_id:string
    access_token:string
    expired_at?:Date
}


export async function createUser (userData :createUserData){
    
        const addUser = await pool.query(`INSERT INTO users (name,email,title,experience_level,cv_link,password) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,[userData.name,userData.email,userData.title,userData.experience_level,userData.cv_link,userData.password])
        return addUser.rows[0]
  
  }
        
export async function findUserByEmail (email:string){
    const user = await pool.query (`SELECT * FROM users WHERE email = $1`,[email])
    return user.rows[0]

}

export async function findAuthProvider(provider: string, providerUserId: string) {
    const result = await pool.query(
        `SELECT * FROM auth_providers WHERE provider = $1 AND provider_user_id = $2`,
        [provider, providerUserId]
    )
    return result.rows[0]
}

export async function createAuthProvider(data:createAuthProviderData){
    const result = await pool.query(`INSERT INTO auth_providers (user_id,provider,provider_user_id,access_token,expired_at) VALUES ($1,$2,$3,$4,$5) RETURNING *`,[data.user_id,data.provider,data.provider_user_id,data.access_token,data.expired_at])
    return result.rows[0];
}

export async function findUserById(id:number){
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`,[id])
    return result.rows[0]
}