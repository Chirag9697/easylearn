import { attendance } from "../../attendance/domain/attendance";

export const update=async(data)=>{
    // const newdata={first_name:data.first_name}
    const userupdate=await attendance.query().patch(data).where('studentid','=',data.studentid).where('classid','=',data.classid);
    // 
    //obj
    console.log(userupdate);
}
