
   
         
            
           

           export type IBookingStatus='active'|'cancelled'|'returned';

           export type IBooking={
             id?:number;
            vehicle_id:number;
             customer_id:number;
             rent_start_date:string;
              rent_end_date:string;
              status:IBookingStatus


           }