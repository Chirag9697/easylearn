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
import { get } from 'http';
dotenv.config();

const app=express();
// const upload=multer({dest:'/files'});
export const router=express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {    
      const uniqueSuffix = Date.now();
      cb(null,  uniqueSuffix+file.originalname);
    }
})
const upload = multer({ storage: storage })
// const multer=require('multer')
router.post('/',upload.single("file"),checktoken(['teacher']),async(req,res)=>{
    try{    
        const{title,classid,teacherid} = req.body;
        const fileName = req.file.filename;
        console.log(fileName);
        console.log(req.file);
        const data={title:title,classid:classid,teacherid:teacherid,filename:fileName};
        const addfile=await frommaterials.create(data);
        console.log(addfile);
        res.send({success:"successfully uploaded file"});
    }catch(error){
        res.send({error:error})
    }
})
router.get('/:id',checktoken(['teacher','student']),async(req,res)=>{
    try{    
        const{id}=req.params;
        const getfile=await frommaterials.get_all(id);
      console.log(getfile);
        // console.log(addfile);
        res.send({files:getfile});
    }catch(error){
        res.send({error:error})
    }
})



