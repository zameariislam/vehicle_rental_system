
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

 const getAllVehicles = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await vehicleServices.getAllVehicles();
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
    next(err)
    

  }
};


const updateVehicle = async (req: Request, res: Response,next:NextFunction) => {
  console.log('vehicleId', req.params.vehicleId);
 
  try {
    const result = await vehicleServices.updateVehicle(req.body, Number(req.params.vehicleId));

      res.status(200).json({
        success: true,
        message:  "Vehicle updated successfully",
        data: result.rows[0],
      });
    
  } catch (err: any) {
     next(err)
      console.log(err)

      
  }
};


const deleteVehicle = async (req: Request, res: Response,next:NextFunction) => {
  
  try {
    const result = await vehicleServices.deleteVehicle(Number(req.params.vehicleId));
     console.log('result',result)

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not Found"
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
   
    next(err)
  }
};



const getVehicleById = async (req: Request, res: Response,next:NextFunction) => {



  try {
    const result = await vehicleServices.getVehicleById(Number(req.params.vehicleId) );

     console.log(req.params.vehicleId)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    next(err)
  }
};




  export const vehicleControllers={
    createVehicle,
    getAllVehicles,
    updateVehicle,
    deleteVehicle,
    getVehicleById
  }