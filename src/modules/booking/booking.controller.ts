import { NextFunction, Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking=async (req:Request,res:Response,next:NextFunction)=>{


    try{

             const result= await bookingServices.createBooking(req.body)
           

        
             return   res.status(201).json({
            success: true,
            message: "Booking created successfully",
             data: result,
             });


    } catch(err:any){

         console.log('error',err)
        next(err)

    

    }

 }


  const getAllBookings = async (req: Request, res: Response,next:NextFunction) => {
   try {
     const result = await bookingServices.getAllBookings();
     if(result.rows.length>0){
        return  res.status(200).json({
       success: true,
       message: "Vehicles retrieved successfully",
       data: result.rows,
     });
     }
 
      return  res.status(200).json({
       success: true,
       message: "No Vehicles  Found",
       data: [],
     });
 
    
   } catch (err: any) {
     console.log('error',err)
     next(err)
     
 
   }
 };
 


 export const bookingControllers={
    createBooking,
    getAllBookings
 }