import { Questions } from "../domain/question";

export const findall=async()=>{
    const allpersons=await Questions.query();
    return allpersons;
}
