import { attendancecheck } from "../domain/attendancecheck";

export const create=async(data)=>{
    const hel=await attendancecheck.query().insert(data);
    return hel;
}
