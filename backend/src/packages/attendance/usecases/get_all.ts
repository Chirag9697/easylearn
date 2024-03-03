import { attendance } from "../domain/attendance";
export const getall=async()=>{
    const allclasses=await attendance.query();
    console.log(allclasses);
    return  allclasses;
}
export const getallclassid=async(studentid)=>{
    const allstudents=await attendance.query().select('classid','status').count('* as count').where('studentid','=',studentid).groupBy('classid','status').where('status','=',1);
    return allstudents;
}
export const getallclassiddate=async(classid,studentid,Date)=>{
    const allstudents=await attendance.query().where('classid','=',classid).where('studentid','=',studentid).where('date','=',Date);
    return allstudents;
}
export const getallclassbyclassid=async(classid,studentid)=>{
    const allstudents=await attendance.query().where('classid','=',classid).where('studentid','=',studentid);
    return allstudents;
}
export const getallonlydate=async(Date)=>{
    const allstudents=await attendance.query().where('date','=',Date);
    return allstudents;
}
