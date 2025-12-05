import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errorhelpers/customError";

 const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{

  
    let message='Something happend'
    let statusCode=500

    if( err instanceof CustomError){
        message=err.message;
        statusCode=err.statusCode;
    }

      res.status(statusCode).json({
        success:false,
        message
      })

      


}


export default globalErrorHandler