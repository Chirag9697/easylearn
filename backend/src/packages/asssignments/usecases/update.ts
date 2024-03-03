
import { assignments } from "../domain/assignments";


export const updatebyid=async(data,id)=>{
    const assignmentsupdate=await assignments.query().findById(id).patch(data);
    return assignmentsupdate;
}
