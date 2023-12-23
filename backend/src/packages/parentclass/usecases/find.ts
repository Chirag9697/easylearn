import { parentclass } from "../domain/parentclass";
export const get_one=async(id:any)=>{
    const person=await parentclass.query().first().where('id','=',id);
    return person;
}
