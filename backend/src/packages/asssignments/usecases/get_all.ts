import { assignments } from "../domain/assignments";
export const getall=async()=>{
    const allassignment=await assignments.query();
    // console.log(allclasses);
    return  allassignment;
}
export const getallbyclassid=async(classid)=>{
    const allassignment=await assignments.query().where('classid','=',classid);
    // console.log(allclasses);
    return  allassignment;
}