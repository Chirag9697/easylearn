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
export const router=express.Router()
// router.post('/',checktoken(['teacher','student']),(req,res)=>{
//     try{
//         const{questions}=req.body;
//         console.log(questions);
//         res.send({success:"added questions"});
//     }catch(error){
//         res.send({error:error});
//     }
// })




