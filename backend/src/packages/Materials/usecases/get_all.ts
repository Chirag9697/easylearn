import { Materials } from "../domain/Material";

export const get_all=async(classid)=>{
    const allmaterials=await Materials.query().where('classid','=',classid);
    console.log("ads",allmaterials);
    return allmaterials;
}
