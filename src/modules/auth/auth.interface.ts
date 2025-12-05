 export type IRole='customer'|'admin'
  export type IUser={
    name:string;
    email:string;
    password:string;
    phone:string;
    role?:IRole
 }