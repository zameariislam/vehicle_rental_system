import config from "../../config";
import { pool } from "../../config/db";
import { CustomError } from "../../errorhelpers/customError";
import { IVehicle } from "./vehicle.interface";


 
 const createVehicle=async (payload:IVehicle)=>{

      const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=payload;
      const registrationNumberRegex= /^[A-Z]{3}-\d{4}$/

      const isRegistrationNumberFormatMatched=registrationNumberRegex.test(registration_number)
      console.log(registrationNumberRegex.test(registration_number))

        if(!isRegistrationNumberFormatMatched){
       
         throw new CustomError(400,'Invalid Registration number format')
       }

      const isVehicleExist = await pool.query(`SELECT * FROM vehicles WHERE registration_number = $1`, [registration_number]);

       if(isVehicleExist.rows.length>0){
       
         throw new CustomError(409,'Vehicle is Already Exist')
       }

        

    
     

     const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1, $2, $3, $4,$5) RETURNING *`,
    [vehicle_name,type,registration_number,daily_rent_price,availability_status]
  );

  return result;




 }



 export const vehicleServices={
    createVehicle
 }