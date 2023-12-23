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
    const addclass=await fromparentclass.create(data1);
    console.log("edasd",addclass);
    try{
        // for(let i=0;i<members.length;i++){
            // const getteacherid=await fromusers.get_one2(req.user.email);

            // const data2={teacherid:getteacherid["id"],studentid:members[i],classid:addclass['parentclass']['id']};
            // const addclass2=await fromclass.create(data2);
        // }
        res.send("class added");
    }catch(error){
        console.log(error)
        // return res.status(200).send({error:`${error}`});
    }
})
router.get('/',checktoken(["teacher"]),async(req,res)=>{
    try{
            const getteacherid=await fromusers.get_one2(req.user.email);
            const getallclasses=await fromclass.getall();
            let getmyclasses=[];
            for(let i=0;i<getallclasses.length;i++){
                // console.log(getallclasses[i].teacherid)
                // console.log(getteacherid["id"]);
                if(getallclasses[i].teacherid.localeCompare( getteacherid["id"])===0){
                    getmyclasses.push(getallclasses[i]);
                };
            }
            console.log(getmyclasses);
            res.send({myclasses:getmyclasses});
        }catch(error){
            res.send({error:error});
        }
    }
)


