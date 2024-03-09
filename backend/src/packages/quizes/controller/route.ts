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
import * as frommaterials from '../../Materials';
import * as frompparentclass from '../../parentclass';
import * as fromclasses from '../../classes';
import * as fromquiz from '../../quizes';
import * as fromquestions from '../../questions';

import { get } from 'http';
dotenv.config();

const app=express();
export const router=express.Router()

router.post('/',checktoken(['teacher']),async(req,res)=>{
    try{
        console.log(req.body);
        const{title,marks,timeof,dateof,mins,classid,questions}=req.body;
        // console.log(questions[0]);
        const data={classid:classid,title:title,Marks:marks,time:dateof,duration:timeof};
        // const getallquiz=await fromquestions.findall();
        // console.log(getallquiz);
        const addquiz=await fromquiz.create(data);
        const{id}=addquiz;
        console.log(id);
        for(let i=0;i<questions.length;i++){
            const newdata={quizid:Number(id),answer:"2",questiontitle:questions[i][0],optiona:questions[i][1],optionb:questions[i][2],optionc:questions[i][3],optiond:questions[i][4]};
            const addquestion=await fromquestions.create(newdata);
        }
        res.send({success:"added quiz"});
    }catch(error){
        res.send({error:error});
    }
})

router.get('/:userid',checktoken(['teacher','student']),async(req,res)=>{
    try{
        const{userid}=req.params;
        const getallclasses=await fromclasses.getallclassstudentid(userid);
        let allquizes=[];
        for(let i=0;i<getallclasses.length;i++){
            const getquiz=await fromquiz.findone(getallclasses[i].id);
            allquizes.push(getquiz);
        }
        console.log(allquizes)
        res.send({success:allquizes});
    }catch(error){
        res.send({error:error});
    }
})








