import { pool } from "../../config/db";
import { IVehicle } from "../vehicle/vehicle.interface";
import { IBooking } from "./booking.interface";
// id,vehicle_id,rent_start_date,rent_end_date,status

const createBooking=async (payload:IBooking)=>{

      const {customer_id,vehicle_id,rent_start_date,rent_end_date}=payload;


       const vehicle= await pool.query(`SELECT  vehicle_name,daily_rent_price FROM vehicles WHERE id = $1`, [vehicle_id]);

       console.log('vehicle',vehicle.rows[0])

      const result = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date) VALUES($1, $2, $3, $4) RETURNING * `,
    [customer_id,vehicle_id,rent_start_date,rent_end_date]
  );

   
  

    const booking:IBooking={
        id: result.rows[0].id,
        customer_id:result.rows[0].customer_id,
        vehicle_id:result.rows[0].vehicle_id,
        rent_start_date:new Date(result.rows[0].rent_start_date).toISOString().split('T')[0],
        rent_end_date:new Date(result.rows[0].rent_end_date).toISOString().split('T')[0],
        status:result.rows[0].status


    }

     console.log( 'booking', booking)


  


  return  {...booking, vehicle:vehicle.rows[0]  } ;




 }



 const getAllBookings = async () => {
  const result = await pool.query(`SELECT "bookings".id, "bookings".vehicle_id,
    TO_CHAR("bookings".rent_start_date,'YYYY-MM-DD') AS rent_start_date,TO_CHAR("bookings".rent_end_date,'YYYY-MM-DD') AS rent_end_date,"bookings".status,
    ( (rent_end_date-rent_start_date)*"vehicles".daily_rent_price) AS total_price,
    json_build_object(
    
    'vehicle_name',  "vehicles".vehicle_name,
     'type', "vehicles".type,
      'vehicle_registration_number',"vehicles".registration_number
    
    ) AS vehicle
    FROM  bookings    
    
   INNER JOIN vehicles on "bookings".vehicle_id=vehicles.id
    
    `);
  return result;
};

 export const bookingServices={
  createBooking,
  getAllBookings
  

 }
