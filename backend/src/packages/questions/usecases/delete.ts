import { Questions } from "../domain/question";

export const deleterecord=async(id:number)=>{
    const deleting=await Questions.query().deleteById(id);
    console.log(deleting);
    return deleting;
    // console.log(allpersons);
}
