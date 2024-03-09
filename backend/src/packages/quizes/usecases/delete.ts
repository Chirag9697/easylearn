import { Quizes } from "../domain/quiz";

export const deleterecord=async(id:number)=>{
    const deleting=await Quizes.query().deleteById(id);
    console.log(deleting);
    return deleting;
    // console.log(allpersons);
}
