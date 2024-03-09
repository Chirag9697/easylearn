
import { Quizes } from "../domain/quiz";

export const create=async(data:Partial<Quizes>)=>{
    const hel=await Quizes.query().insert(data);
    return hel;
}
