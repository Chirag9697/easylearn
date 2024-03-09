import { Quizes } from "../domain/quiz";

export const findall=async()=>{
    const allpersons=await Quizes.query();
    return allpersons;
}
