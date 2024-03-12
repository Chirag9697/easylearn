//lib
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checktoken } from '../../../utils/check-token';
//local
import multer from 'multer';
import * as fromusers from '../../users';
import * as fromannouncements from '../../announcements';
import * as frompparentclass from '../../parentclass';
import * as frommaterials from '../../Materials';
import * as fromquestions from '../../questions';
import { get } from 'http';
dotenv.config();

const app=express();
export const router=express.Router()
router.get('/:quizid',checktoken(['teacher','student']),async(req,res)=>{
    try{
        const{quizid}=req.params;
    const allquestions=await fromquestions.findall();
     console.log(allquestions);
        res.send({success:allquestions});
    }catch(error){
        res.send({error:error});
    }
})




