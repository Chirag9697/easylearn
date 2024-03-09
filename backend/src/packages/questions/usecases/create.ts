import { Questions } from "../domain/question";

export const create=async(data:Partial<Questions>)=>{
    const hel=await Questions.query().insert(data);
    return hel;
}
