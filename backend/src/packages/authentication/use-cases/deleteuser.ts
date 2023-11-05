import * as fromusers from '../../users';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const deleteuser=async(id:number)=>{
    console.log("deleting user hashs");
    const userfind=await fromusers.get_one(id);
    
    // console.log("user found",userfind);
    try{

        const deleting=await fromusers.deleterecord(id);
        console.log(deleting);
        // console.log(deleting);]
        // console.log("fulldeleting",deleting);
        if(!deleting){
            throw new Error("not able to delete");
        }
    }catch(error){
        console.log(error);
    }
    // return result;
}

