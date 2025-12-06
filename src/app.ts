
import express, { NextFunction, Request, Response } from 'express'
import dbinIt from './config/db'
import authRoutes from './modules/auth/auth.routes'
import notFound from './middleware/notFound'
import { CustomError } from './errorhelpers/customError'
import globalErrorHandler from './middleware/globalErrorHandler'
import vehicleRoutes from './modules/vehicle/vehicle.routes'


const app = express()

app.use(express.json())

dbinIt()



app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/vehicles',vehicleRoutes)










app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})


app.use(notFound)



app.use( globalErrorHandler  )


export default app