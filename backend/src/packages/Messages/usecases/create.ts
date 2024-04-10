// import { Materials } from "../domain/Material";
import { Messages} from "../domain/Messages";

export const create=async(data:Partial<Messages>)=>{
    const hel=await Messages.query().insert(data);
    return hel;
}
