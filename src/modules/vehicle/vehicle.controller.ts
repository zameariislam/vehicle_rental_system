
import { NextFunction, Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";


 const createVehicle=async (req:Request,res:Response,next:NextFunction)=>{


    try{

             const result= await vehicleServices.createVehicle(req.body)

             return   res.status(201).json({
           success: true,
           message: "Vehicle created successfully",
             data: result.rows[0],
             });


    } catch(err:any){

         console.log('error from con',err)
        next(err)

    

    }



 }


  export const vehicleControllers={
    createVehicle
  }