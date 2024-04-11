//lib
import express from 'express';
import { checktoken } from '../../../utils/check-token';
import * as fromattendance from '../../attendance';
import * as fromparentclass from '../../parentclass';
import * as frommarks from '../../Marks';
import * as frommessages from '../../Messages';
// import Date
const app=express();
export const router=express.Router()


router.post('/',checktoken(['teacher','student']),async(req,res)=>{
    try{
        const{message,senderid,receiverid,date}=req.body;
        const data={message,senderid,receiverid,date};
        const addmessage=await frommessages.create(data);
        res.send({success:"messages is added"});
    }catch(error){
        res.send({error:error});
    }
})
router.get('/doubts/:userid',checktoken(['teacher','student']),async(req,res)=>{
    try{
        const{userid}=req.params;
        const getmessages=await frommessages.getalldoubts(userid);
        console.log(getmessages);
        res.send({messages:getmessages});
    }catch(error){
        res.send({error:error});
    }
})
router.get('/:userid/:otherid',checktoken(['teacher','student']),async(req,res)=>{
    try{
        const{userid,otherid}=req.params;
        const getmessages=await frommessages.findall(userid,otherid);
        console.log(getmessages);
        res.send({messages:getmessages});
    }catch(error){
        res.send({error:error});
    }
})
