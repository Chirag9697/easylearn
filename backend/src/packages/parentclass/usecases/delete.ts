import { parentclass } from "../domain/parentclass";
export const deleterecord=async(id:number)=>{
    const deleting=await parentclass.query().deleteById(id);
    console.log(deleting);
    return deleting;
    // console.log(allpersons);
}
