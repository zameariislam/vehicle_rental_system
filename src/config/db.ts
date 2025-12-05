import { Pool } from "pg"
import config from ".";

//DB
export const pool = new Pool({
  connectionString: `${config.connectionString}`,
});


    const dbinIt=async()=>{
        try{

        await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL CHECK(email=LOWER(email)),
        password TEXT NOT NULL CHECK(LENGTH(password)>=6),
        phone VARCHAR(15) NOT NULL ,
        role VARCHAR(50)  CHECK(role IN ('admin', 'customer')) DEFAULT 'customer'
       
        )
        `);

        } catch(err:any){
             console.log('Error from database',err.message)

        }


    }

    export default dbinIt