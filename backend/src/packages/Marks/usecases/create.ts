// import { Materials } from "../domain/Material";
import { Marks } from "../domain/Marks";

export const create=async(data:Partial<Marks>)=>{
    const hel=await Marks.query().insert(data);
    return hel;
}
