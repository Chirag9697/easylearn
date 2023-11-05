import * as fromusers from '../../users';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const register=async(data)=>{
    const {email,password,name}=data;
    console.log("hello");
    const finduser=await fromusers.get_one2(email);
    console.log("hello",finduser);
    console.log("users",finduser);
   if(finduser){
        throw new Error("email is already used");
        return;
    }
    const data1={email:email,name:name,password:await bcrypt.hash(password,parseInt(process.env.Saltrounds))};

    const userid=await fromusers.create(data1);    
    return userid;
}

