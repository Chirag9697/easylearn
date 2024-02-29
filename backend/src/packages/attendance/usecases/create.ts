import { attendance } from "../domain/attendance";
export const create=async(data:any)=>{
    const hel=await attendance.query().first().insert(data);
    return hel;
}
