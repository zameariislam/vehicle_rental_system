import { Pool } from "pg"
import config from ".";

  //  total_price INT  NOT NULL CHECK(total_price>=0),
// CHECK (registration_number ~ )

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

          await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(100) NOT NULL CHECK(type IN ('car', 'bike', 'van','SUV')) ,
        registration_number VARCHAR(50) NOT NULL UNIQUE ,

        daily_rent_price INT  NOT NULL CHECK(daily_rent_price>=0),
        availability_status VARCHAR(50)  CHECK( availability_status IN ('available','booked')) DEFAULT 'available'
      
       
        )
        `);


          await pool.query(`
            CREATE TABLE IF NOT EXISTS bookings(
            id SERIAL PRIMARY KEY,
           customer_id INT REFERENCES  users(id) ON DELETE CASCADE,
           vehicle_id INT REFERENCES   vehicles(id) ON DELETE CASCADE,
            
           rent_start_date DATE NOT NULL CHECK(rent_start_date>=CURRENT_DATE),
           rent_end_date DATE NOT NULL  CHECK(rent_end_date >rent_start_date ),
        

           status VARCHAR(100)  CHECK(status IN ('active','cancelled','returned')) DEFAULT 'active'
            )
            `);

        } catch(err:any){
             console.log('Error from database',err.message)

        }


    }

    export default dbinIt