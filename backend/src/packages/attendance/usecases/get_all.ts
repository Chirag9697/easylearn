import { attendance } from "../domain/attendance";
export const getall=async()=>{
    const allclasses=await attendance.query();
    console.log(allclasses);
    return  allclasses;
}
export const getallclassid=async(classid,studentid)=>{
    const allstudents=await attendance.query().where('classid','=',classid).where('studentid','=',studentid).groupBy('classid');
    return allstudents;
}
