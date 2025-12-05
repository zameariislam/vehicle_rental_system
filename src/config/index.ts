

 import dotenv from 'dotenv'
 import path from 'path'

 dotenv.config({path: path.join(process.cwd(),'.env')})


   const config={
    port:process.env.PORT,
    connectionString:process.env.CONNECTION_STRING,
    saltRounds:process.env.SALT_ROUNDS,
    jwtSecret:process.env.JWT_SECRET,
    jwtExpire:process.env.JWT_EXPIRE

   }


   export  default config