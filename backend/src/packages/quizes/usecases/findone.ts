import { Quizes } from "../domain/quiz";

export const findone=async(id:any)=>{
    const allquizzes=await Quizes.query().first().where('classid','=',id);
    return allquizzes;
}
