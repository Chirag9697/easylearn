// import { Materials } from "../domain/Material";
import { Classgroup } from "../domain/classgroup";
export const create=async(data:Partial<Classgroup>)=>{
    const hel=await Classgroup.query().insert(data);
    return hel;
}
