import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checktoken } from '../../../utils/check-token';
import axios from 'axios';
//local
import * as fromcheckattendance from '../../attendancecheck';
dotenv.config();


const app=express();
export const router=express.Router()

router.get('/:classid/:teacherid',checktoken(["teacher","student"]),async(req,res)=>{
    try{   
        // console.log("hello")
        const{classid,teacherid}=req.params;
        console.log(classid);
        console.log(teacherid);
        const date=new Date().toLocaleDateString();
        const getattendance=await fromcheckattendance.get_all(classid,teacherid,date);
        console.log(getattendance);
        res.send({attendance:getattendance});
    }catch(error){
        res.send({error:error});
    }
})
router.post('/',checktoken(["teacher","student"]),async(req,res)=>{
    try{   
        console.log("adding attendance");
        const{classid,teacherid}=req.body;
        const date=new Date().toLocaleDateString();
        const data={classid,teacherid,date};
        const getattendance=await fromcheckattendance.create(data);
        res.send({success:"attendance created successfully"});
    }catch(error){
        res.send({error:error});
    }
})