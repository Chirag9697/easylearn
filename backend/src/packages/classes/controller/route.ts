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
import * as fromparentclass from '../../parentclass';
import { parentclass } from '../../parentclass/domain/parentclass';
dotenv.config();

const app=express();
export const router=express.Router()


router.post('/',checktoken(["teacher"]),async(req,res)=>{
    console.log("adding classroom");
    console.log(req.body);
    const {classname,members}=req.body;
    const data1={classname:classname};
    try{
        const addclass=await fromparentclass.create(data1);
        const{classname,id}=addclass;
        console.log(id);
        for(let i=0;i<members.length;i++){
            const getteacherid=await fromusers.get_one2(req.user.email);
            const data2={teacherid:getteacherid["id"],studentid:members[i],classid:id};
            const addclass2=await fromclass.create(data2);
            console.log(addclass2);
        }
        res.send("class added");
    }catch(error){
        console.log(error)
    }
})
router.get('/',checktoken(["teacher","student"]),async(req,res)=>{
    try{
            const getteacherid=await fromusers.get_one2(req.user.email);
            console.log(req.user);
            const getallclasses=await fromclass.getall();
            let getmyclasses=[];
            for(let i=0;i<getallclasses.length;i++){

                if(req.user.role=="teacher" && getallclasses[i].teacherid.localeCompare(getteacherid["id"])===0){
                    getmyclasses.push(getallclasses[i]);
                };
                if(req.user.role=="student" && getallclasses[i].studentid.localeCompare(getteacherid["id"])===0){
                    getmyclasses.push(getallclasses[i]);
                };

            }
            let getclassdetails=[];
            for(let j=0;j<getmyclasses.length;j++){
                const getclass=await fromparentclass.get_one(getmyclasses[j].classid);
                getclassdetails.push(getclass);
            }
            res.send({myclasses:getclassdetails});
        }catch(error){
            res.send({error:error});
        }
    }
)


