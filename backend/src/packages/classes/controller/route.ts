//lib
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checktoken } from '../../../utils/check-token';
import * as fromusers from '../../users';
import * as fromauth from '../../authentication';
import * as fromclass from '../../classes';
import * as fromparentclass from '../../parentclass';
import * as fromannouncement from '../../announcements';
import { parentclass } from '../../parentclass/domain/parentclass';
import { checkPrime } from 'crypto';
dotenv.config();

const app=express();
export const router=express.Router()


router.post('/',checktoken(["teacher"]),async(req,res)=>{
    console.log("adding classroom");
    console.log(req.body);
    const {classname,members,teacherid}=req.body;
    const data1={classname:classname,teacherid:teacherid};
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
        res.send({allclasses:addclass});
    }catch(error){
        res.send({error:error});
    }
})
router.get('/',checktoken(["teacher","student"]),async(req,res)=>{
    try{
            const getteacherid=await fromusers.get_one2(req.user.email);
            const getallclasses=await fromclass.getall();
            const getallclassesteacher=await fromparentclass.getall();
            let getmyclasses=[];
            for(let i=0;i<getallclassesteacher.length;i++){
                if(req.user.role=="teacher" && getallclassesteacher[i]['teacherid'].localeCompare(getteacherid["id"])===0){
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
            console.log(getclassdetails);
            res.send({myclasses:getclassdetails});
        }catch(error){
            res.send({error:error});
        }
    }
)

router.get('/members/:classid',checktoken(["teacher","student"]),async(req,res)=>{
    try{
        const{classid}=req.params;
        const alldetails=await fromclass.getallclassid(classid);
        console.log("allddetails",alldetails);
        let allstudents=[];
        for(let i=0;i<alldetails.length;i++){
            let student=await fromusers.get_one(alldetails[i].studentid);
            allstudents.push(student);
        }
        res.send({allstudents:allstudents});
    }catch(error){
        res.send({error:error});
    }
})

router.delete('/:classid',checktoken(["teacher"]),async(req,res)=>{
    try{
        console.log("deleting");
        const{classid}=req.params;
        console.log(classid);
        const deletefromparentclass=await fromparentclass.deleterecord(classid);
        const deletefromclass=await fromclass.deleterecordbyclassid(classid);
        const deletefromannouncement=await fromannouncement.deleterecordbyclassid(classid);
        res.send({success:"class successfully deleted"});
    }catch(error){
        res.send({error:error});
    }
})

router.get('/faculties/:studentid',checktoken(["teacher","student"]),async(req,res)=>{
    try{
        const{studentid}=req.params;
        let allstudents=[];
        const allfacultylist=await fromclass.getallfaculties(studentid);
        const allfacultydetails=[];
        let i;
        for(i=0;i<allfacultylist.length;i++){
            const detailsoffaculty=await fromusers.get_one(allfacultylist[i].teacherid);
            const newobj={id:allfacultylist[i].teacherid,name:detailsoffaculty.name,email:detailsoffaculty.email};
            allfacultydetails.push(newobj);
        }
        console.log(allfacultydetails);
        res.send({allfacultylist:allfacultydetails});
    }catch(error){
        res.send({error:error});
    }
})


