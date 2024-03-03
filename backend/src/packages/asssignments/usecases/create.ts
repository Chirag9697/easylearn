import { assignments } from "../domain/assignments";
export const create=async(data:any)=>{
    const hel=await assignments.query().first().insert(data);
    return hel;
}
