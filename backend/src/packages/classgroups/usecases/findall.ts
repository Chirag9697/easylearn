import { Classgroup } from "../domain/classgroup";
export const get_all=async()=>{
    const allmarks=await Classgroup.query();
    return allmarks;
}
export const findall=async(classid)=>{
    const allmarks=await Classgroup.query().where('classid','=',classid);
    return allmarks;
}
