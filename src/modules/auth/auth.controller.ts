import { Request, Response } from "express";
import { authServices } from "./auth.service";

 const userRegistration=async (req:Request,res:Response)=>{


    try{

             const result= await authServices.userRegistration(req.body)

             return   res.status(201).json({
            success: true,
            message: "User registered successfully",
             data: result.rows[0],
             });


    } catch(err:any){

    console.log(  err);
      res.status(500).json({
      success: false,
      message: err.message,
    });

    }

     



   


 }


 export const authControllers={
    userRegistration
 }