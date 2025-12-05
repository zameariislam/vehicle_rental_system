import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service";

 const userRegistration=async (req:Request,res:Response,next:NextFunction)=>{


    try{

             const result= await authServices.userRegistration(req.body)

             return   res.status(201).json({
            success: true,
            message: "User registered successfully",
             data: result.rows[0],
             });


    } catch(err:any){
        next(err)

    

    }



 }

  const userLogin=async (req:Request,res:Response,next:NextFunction)=>{

 


    try{

             const result= await authServices.userLogin(req.body)
             res.set('Authorization',  `Bearer ${result.token}`)

             return   res.status(201).json({
             success: true,
             message: "Login successful",
             data: result,
             });


    } catch(err:any){
        next(err)

    

    }



 }


 export const authControllers={
    userRegistration,
    userLogin
 }