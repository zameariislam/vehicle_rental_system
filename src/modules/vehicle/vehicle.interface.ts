 
export type IVehicleType='car'|'van'|'SUV'|'bike'
export type IVehicleStatus='available'|'booked'

 export type IVehicle= {
  vehicle_name: string;
  type: IVehicleType;
  registration_number: string;
  daily_rent_price:number;
  availability_status: IVehicleStatus
}