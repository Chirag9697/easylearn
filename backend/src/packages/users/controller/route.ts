//lib
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checktoken } from '../../../utils/check-token';
import * as fromusers from  '../../users';
//local
dotenv.config();

const app=express();
export const router=express.Router();


router.get('/',checktoken(["teacher"]),async(req,res)=>{
   try{
    const allusers=await fromusers.get_all();
    const allstudents=[];
    for(let i=0;i<allusers.length;i++){
        if(allusers[i].role==="student"){
            allstudents.push(allusers[i]);
        }
    }
    // console.log(allusers);
    res.send({allstudents:allstudents});
   }catch(error){
    res.status(400).send({error:error});
   }
})
router.get('/getmydetails',checktoken(["student","teacher"]),async(req,res)=>{
    try{
        const getmyacc=await fromusers.get_one2(req.user.email);
        res.send({details:getmyacc});
    }catch(error){
        res.send({error:error});
    }
})