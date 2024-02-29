import { Materials } from "../domain/Material";

export const create=async(data:Partial<Materials>)=>{
    const hel=await Materials.query().insert(data);
    return hel;
}
