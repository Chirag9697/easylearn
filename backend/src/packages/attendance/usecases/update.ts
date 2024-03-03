import { attendance } from "../../attendance/domain/attendance";

export const update=async(data)=>{
    // const newdata={first_name:data.first_name}
    const attendanceupdate=await attendance.query().patch(data).where('studentid','=',data.studentid).where('classid','=',data.classid).where('date','=',data.Date);
    // 
    //obj
    return attendanceupdate;
    // console.log(userupdate);
}
export const updatebyid=async(data,id)=>{
    // const newdata={first_name:data.first_name}
    const attendanceupdate=await attendance.query().findById(id).patch(data);
    // console.loga()
    // 
    //obj
    return attendanceupdate;
    // console.log(userupdate);
}
