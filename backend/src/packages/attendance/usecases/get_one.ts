import { attendance } from "../domain/attendance";

export const get_one=async(id:any)=>{
    const person=await attendance.query().first().where('id','=',id);
    return person;
}
