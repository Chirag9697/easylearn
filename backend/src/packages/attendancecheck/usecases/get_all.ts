import { attendancecheck } from "../domain/attendancecheck";

export const get_all=async(classid,teacherid,date)=>{
    const allrecords=await attendancecheck.query().where('classid','=',classid).where('teacherid','=',teacherid).where('date','=',date);
    return allrecords;
}
