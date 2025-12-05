import { Request, Response } from "express";

 const notFound=(req:Request, res:Response)=>{
     console.log(req.path)

    res.status(404).json({
        success:false,
        message:`Not Found the route ${req.path}`
    })

 }

 export default notFound