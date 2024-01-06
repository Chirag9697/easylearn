//lib
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checktoken } from '../../../utils/check-token';
//local
import * as fromusers from '../../users';
import * as fromannouncements from '../../announcements';
import * as frompparentclass from '../../parentclass';
dotenv.config();

const app=express();
export const router=express.Router()

router.get('/:classid/:teacherid',checktoken(['teacher','student']),async(req,res)=>{
    try{    
        if(req.user.role==="teacher"){

            const{classid,teacherid}=req.params;
            // console.log("hello",req.user);

            const allannouncement=await fromannouncements.getallannouncementc(classid,teacherid);
            console.log(allannouncement);
            res.send({announcements:allannouncement});
        }
        else{
            const{classid}=req.params;
            const getteacherid=await frompparentclass.get_one(classid);
            const{teacherid}=getteacherid; 
            const allannouncement=await fromannouncements.getallannouncementc(classid,teacherid);
            res.send({announcements:allannouncement});
        }
    }catch(error){
        res.send({error:error})
    }
})
router.delete('/:id',checktoken(['teacher']),async(req,res)=>{
    try{    
        const{id}=req.params;
        const delannouncement=await fromannouncements.deleterecord(id);
        res.send({message:"successfully deleted"});
    }catch(error){
        res.send({error:error})
    }
})
router.post('/',checktoken(['teacher']),async(req,res)=>{
    try{    
        const{teacherid,classid,message}=req.body;
        console.log("daedw",req.body);
        const newdata={teacherid:teacherid,classid:classid,message:message};
        const addannouncement=await fromannouncements.create(newdata);
        const getallannouncement=await fromannouncements.getall();
        console.log("getall",getallannouncement);
        res.send({message:"successfully announcement added"});
    }catch(error){
        res.send({error:error})
    }
})



