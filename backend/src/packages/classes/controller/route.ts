//lib
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checktoken } from '../../../utils/check-token';
//local
import * as fromusers from '../../users';
import * as fromauth from '../../authentication';
import * as fromclass from '../../classes';
dotenv.config();

const app=express();
export const router=express.Router()


router.post('/',checktoken(["teacher"]),async(req,res)=>{
    console.log("adding classroom");
    console.log(req.body);
    const {classname,members}=req.body;
    try{
        let i;
        for(i=0;i<members.length;i++){
            const getteacherid=await fromusers.get_one2(req.user.email);
            const data={classname:classname,studentid:members[i],teacherid:getteacherid["id"]};
            const addclass=await fromclass.create(data);
        }
        res.send("class added");
    }catch(error){
        console.log(error)
        // return res.status(200).send({error:`${error}`});
    }
})


