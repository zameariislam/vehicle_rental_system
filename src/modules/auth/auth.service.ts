import config from "../../config";
import { pool } from "../../config/db";
import { CustomError } from "../../errorhelpers/customError";
import { IUser } from "./auth.interface";

import bcrypt from 'bcrypt'
 import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

 

 
 const userRegistration=async (payload:IUser)=>{

      const {name,email,password,phone,role}=payload;

      const isUserExist = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

       if(isUserExist.rows.length>0){
       
         throw new CustomError(409,'User is Already Exist')
       }

        

       const hashedPassword=await  bcrypt.hash(password, Number(config.saltRounds) as number)
     

      const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role) VALUES($1, $2, $3, $4,$5) RETURNING *`,
    [name,email,hashedPassword,phone,role]
  );

  return result;




 }


 const userLogin=async (payload:Partial<IUser>)=>{

      const {email,password}=payload;

       const isUserExist = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        console.log('user',isUserExist.rows[0].password)

       if(isUserExist.rows.length==0){
       
         throw new CustomError(400,'Email does not  Exist !!')
       }
     

    const isPasswordMatched= await bcrypt.compare(password as string,isUserExist.rows[0].password)

    if(!isPasswordMatched){
        throw new CustomError(400,'InValid Password')

    }

      const jwtPayload={
        id:isUserExist.rows[0].id,
        email:isUserExist.rows[0].email,
        role:isUserExist.rows[0].role
      }

       console.log( )

       const token= jwt.sign(jwtPayload,config.jwtSecret as string, {
        expiresIn:'1d'
       })    
      


         const user={
            id:isUserExist.rows[0].id,
            name:isUserExist.rows[0].name,
            email:isUserExist.rows[0].email,
            phone:isUserExist.rows[0].phone,
            role:isUserExist.rows[0].role,
         }


         return { token,user}

    



    
   



 }






 export const authServices={
    userRegistration,
    userLogin
 }