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


 
const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};


const updateVehicle = async (payload:Partial<IVehicle>,id:number) => {
     
     const fieldToUpdate=Object.keys(payload)
    
     const updatedValues=Object.values(payload)
       const setField=fieldToUpdate?.map((fieldName,index)=> `${fieldName}=$${++index}` ).join( ' ,')
       
 
  const result = await pool.query(
    `UPDATE vehicles SET ${setField} WHERE id=$${fieldToUpdate.length +1} RETURNING *`,
    [...updatedValues, id]
  );

  return result;
};

const deleteVehicle = async (id:number) => {
  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);

  return result;
};


const getVehicleById = async (id: number) => {
     console.log('i am here to get',id)
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);

  return result;
};


 export const vehicleServices={
    createVehicle,
    getAllVehicles,
    updateVehicle,
    deleteVehicle,
    getVehicleById
 }