
 import express from 'express'
import { authControllers } from './auth.controller'

  const router=express.Router()

  router.get('/',(req,res)=>{

    res.status(200).json({message:'Hello world'})

  })


  router.post('/signup',authControllers.signUp)





 const authRoutes=router 


 export default authRoutes