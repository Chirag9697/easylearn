//lib
import express from 'express';
import { checktoken } from '../../../utils/check-token';
import * as frommarks from '../../Marks';
import * as fromgroups from '../../classgroups';
// import Date
const app=express();
export const router=express.Router()


router.post('/',checktoken(['teacher','student']),async(req,res)=>{
    try{
        const{link,classid}=req.body;
        const data={link,classid};
        const addmarks=await fromgroups.create(data);
        console.log("hello")
        res.send({success:"group is added"});
    }catch(error){
        res.send({error:error});
    }
})
router.get('/:classid',checktoken(['teacher','student']),async(req,res)=>{
    try{
        const{classid}=req.params;
        const getgroups=await fromgroups.findall(classid);
        res.send({success:getgroups});
    }catch(error){
        res.send({error:error});
    }
})
