
import express, { Request, Response } from 'express'
import dbinIt from './config/db'
import authRoutes from './modules/auth/auth.routes'


const app = express()

app.use(express.json())

dbinIt()



app.use('/api/v1/auth',authRoutes)


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})



export default app