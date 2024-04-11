// import { Marks } from "../domain/Marks";
import { all } from "axios";
import { Messages } from "../domain/Messages";

export const get_all=async()=>{
    const allmessages=await Messages.query();
    return allmessages;
}
export const findall=async(userid,otherid)=>{
    const allmarks=await Messages.query().where(builder=>{builder.where('senderid',userid).where('receiverid',otherid)}).orWhere(builder=>{builder.where('senderid',otherid).where('receiverid',userid)}).orderBy("date","asc");
    return allmarks;
}
export const getalldoubts=async(userid)=>{
    const alldoubts1=await Messages.query().select('receiverid').distinct("receiverid").where('senderid',userid).orderBy("date","asc");
    const alldoubts2=await Messages.query().select('senderid').distinct("senderid").where('receiverid',userid).orderBy("date","asc");
    // console.log(alldoubts);
    let doubtstog=[];
    for(let i=0;i<alldoubts1.length;i++){
        if(doubtstog.includes(alldoubts1[i].receiverid)==false){
            doubtstog.push(alldoubts1[i].receiverid)
        }
    }
    for(let i=0;i<alldoubts2.length;i++){
        if(doubtstog.includes(alldoubts2[i].senderid)==false){
            doubtstog.push(alldoubts2[i].senderid)
        }
    }
    console.log(doubtstog);
    return doubtstog;

}