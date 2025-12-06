import { pool } from "../../config/db";
import { IUser } from "../auth/auth.interface";

const getAllUsers = async () => {
  const result = await pool.query(`SELECT name,email,phone,role FROM users`);
  return result;
};


const updateUser = async (payload:Partial<IUser>,id:number) => {
     
     const fieldToUpdate=Object.keys(payload)
    
     const updatedValues=Object.values(payload)
       const setField=fieldToUpdate?.map((fieldName,index)=> `${fieldName}=$${++index}` ).join( ' ,')
       
 
  const result = await pool.query(
    `UPDATE users SET ${setField} WHERE id=$${fieldToUpdate.length +1} RETURNING *`,
    [...updatedValues, id]
  );

  return result;
};

const deleteUser = async (id:number) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

  return result;
};


export const userServices={
    getAllUsers,
    updateUser,
    deleteUser
}