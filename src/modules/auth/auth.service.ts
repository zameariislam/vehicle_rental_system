import { pool } from "../../config/db";

 

 type IRole='customer'|'admin'
 type IUser={
    name:string;
    email:string;
    password:string;
    phone:string;
    role:IRole
 }

 
 const userRegistration=async (payload:IUser)=>{

      const {name,email,password,phone,role}=payload;
      const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role) VALUES($1, $2, $3, $4,$5) RETURNING *`,
    [name,email,password,phone,role]
  );

  return result;




 }






 export const authServices={
    userRegistration
 }