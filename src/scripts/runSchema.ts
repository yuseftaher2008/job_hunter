import fs from 'node:fs'
import  {pool}  from '../config/db.js' 
import { fileURLToPath } from 'url';
import path from 'node:path';


const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const schemaPath = path.join(__dirname, '..', '..', 'schema.sql')
const schema = fs.readFileSync(schemaPath,{encoding: 'utf8'});
async function main (){
        try {
        await pool.query(schema);
        console.log('created')
    } catch (err) {
        console.log(err)
    }finally{
        await pool.end()
    }
}
main()