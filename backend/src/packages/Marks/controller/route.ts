//lib
import express from 'express';
import { checktoken } from '../../../utils/check-token';
import * as fromattendance from '../../attendance';
import * as fromparentclass from '../../parentclass';
import * as frommarks from '../../Marks';
// import Date
const app=express();
export const router=express.Router()


router.post('/',checktoken(['teacher','student']),async(req,res)=>{
    try{
        const{title,sourceid,userid,marks}=req.body;
        const data={title,sourceid,userid,marks};
        const addmarks=await frommarks.create(data);
        console.log("hello")
        res.send({success:"marks are added"});
    }catch(error){
        res.send({error:error});
    }
})
router.get('/:userid',checktoken(['teacher','student']),async(req,res)=>{
    try{
        const{userid}=req.params;
        const getmarks=await frommarks.findall(userid);
        // const marks=getmarks.Marks;
        // console.log("getmarks",getmarks);
        res.send({success:getmarks});
    }catch(error){
        res.send({error:error});
    }
})
