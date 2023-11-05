import * as fromusers from '../../users';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const login=async(data)=>{
    const{email,password}=data;
    const userlogging=await fromusers.get_one2(email);
    if(!userlogging){
        throw new Error("user not found"); 
        return;       
    }  
    const check=await bcrypt.compare(password,userlogging['password']);
    if(!check){
        throw new Error("password is not correct");
        return;
    }
    const token=jwt.sign({email:email,password:password},process.env.PRIVATE_KEY);
    const result={token:token};
    return result;
}

