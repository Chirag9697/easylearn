//lib
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//local
import * as fromusers from '../../users';
import * as fromauth from '../../authentication';

dotenv.config();

const app=express();
export const router=express.Router()


router.post('/register',async(req,res)=>{
    console.log("registerhere");
    console.log(req.body);
    const {name,email,password,role}=req.body;
    const data1={name,email,password,role}
    console.log(data1)
    try{
        const newuser=await fromauth.register(data1)
        console.log("New USER",newuser);
        return res.status(200).send(newuser);
    }catch(error){
        console.log(error)
        res.status(200).send({error:`${error}`});
    }
})

router.delete('/deleteuser/:id',async(req,res)=>{
    console.log("delete this user please");
    const{id}=req.params;
    console.log("id of the user",id);
    try{
        await fromauth.deleteuser(parseInt(id));
        res.status(200).send("user deleted");
        
    }catch(error){
        return res.status(200).send({error:`${error}`});
    }

})

router.post('/login',async(req,res)=>{
    const {email,password,role}=req.body;
    // console.log("hello")
    const data={email,password,role};
    console.log(data)
    try{
        const tok=await fromauth.login(data);
        console.log(tok);
       return res.status(200).json(tok)
    //    return res.send();
    }catch(error){
        console.log(error);
        return res.status(200).send({error:`${error}`});
    }
})