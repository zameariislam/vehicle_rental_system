
  import express, { NextFunction, Request, Response } from 'express'
import { userServices } from './user.service';



const getAllUsers = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const result = await userServices.getAllUsers();
      if(result.rows.length>0){
        
         return  res.status(200).json({
        success: true,
        message:  "Users retrieved successfully",
        data: result.rows,
      });
      }
  
       return  res.status(200).json({
        success: true,
        message: "No User Found",
        data: [],
      });
  
     
    } catch (err: any) {
      next(err)
      
  
    }
  };

  const updateUser = async (req: Request, res: Response,next:NextFunction) => {
   
   
    try {
      const result = await userServices.updateUser(req.body, Number(req.params.userId));
  
        res.status(200).json({
          success: true,
          message:  "User updated successfully",
          data: result.rows[0],
        });
      
    } catch (err: any) {
       next(err)
        console.log(err)
  
        
    }
  };


  const deleteUser= async (req: Request, res: Response,next:NextFunction) => {
    
    try {
      const result = await userServices.deleteUser(Number(req.params.userId));
       console.log('result',result)
  
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: "User not Found"
        });
      } else {
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
          data: result.rows,
        });
      }
    } catch (err: any) {
     
      next(err)
    }
  };
  
  


  export const userControllers={
    getAllUsers,
    updateUser,
    deleteUser
  }

  

   
