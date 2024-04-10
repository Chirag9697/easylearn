// import { Marks } from "../domain/Marks";
import { Messages } from "../domain/Messages";

export const get_all=async()=>{
    const allmessages=await Messages.query();
    return allmessages;
}
export const findall=async(userid,otherid)=>{
    const allmarks=await Messages.query().where(builder=>{builder.where('senderid',userid).where('receiverid',otherid)}).orWhere(builder=>{builder.where('senderid',otherid).where('receiverid',userid)}).orderBy("date","asc");
    return allmarks;
}
