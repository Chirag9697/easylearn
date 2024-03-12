// import { Marks } from "../domain/Marks";
import { Marks } from "../domain/Marks";

export const get_all=async()=>{
    const allmarks=await Marks.query();
    return allmarks;
}
export const findall=async(userid)=>{
    const allmarks=await Marks.query().where('userid','=',userid);
    return allmarks;
}
