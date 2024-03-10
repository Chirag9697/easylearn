//lib
import express from 'express';
import { checktoken } from '../../../utils/check-token';
import * as fromattendance from '../../attendance';
import * as fromparentclass from '../../parentclass';
import * as frommarks from '../../Marks';
// import Date
const app=express();
export const router=express.Router()


router.post('/',async(req,res)=>{
    try{
        // const{title,sourceid,userid}=req.body;
        console.log("hello")
        res.send({success:"marks are added"});
    }catch(error){
        res.send({error:error});
    }
})
