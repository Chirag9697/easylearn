import { parentclass } from "../domain/parentclass";
export const create=async(data:Partial<parentclass>)=>{
    const hel=await parentclass.query().insert(data);
    return hel;
}
