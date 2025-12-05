import config from "../../config";
import { pool } from "../../config/db";
import { IUser } from "./auth.interface";

import bcrypt from 'bcrypt'

 

 
 const userRegistration=async (payload:IUser)=>{

      const {name,email,password,phone,role}=payload;

       const hashedPassword=await  bcrypt.hash(password, Number(config.saltRounds) as number)
        console.log(hashedPassword)

      const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role) VALUES($1, $2, $3, $4,$5) RETURNING *`,
    [name,email,hashedPassword,phone,role]
  );

  return result;




 }


 const userLogin=async (payload:Partial<IUser>)=>{

      const {email,password}=payload;
     
   



 }






 export const authServices={
    userRegistration,
    userLogin
 }