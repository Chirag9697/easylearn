import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as fromusers from '../packages/users';
// import * as fromroles from '../packages/roles';
dotenv.config();
export const checktoken=async(req,res,next)=>{
    
        const token=req.headers['token'];
        console.log("token",token);
        if(!token){
            return res.status(200).send({error:"you need to login first"});
        }
        console.log(process.env.PRIVATE_KEY);
        await jwt.verify(token.toString(),process.env.PRIVATE_KEY,async function(err,decoded){
            console.log(decoded);
            if(err){
                return res.status(200).send({error:`${err.message}`});
            }
            // return decoded;
            // console.log("hello I am user",decoded);
            
            req.user=decoded;
            // console.log("using",req.user);
            const user=await fromusers.get_one2(decoded.email);
            console.log(user);
            // const role=await fromroles.get_one(user['id']);
            // console.log("roles",role)

            console.log("logged in")
            // console.log(rolesdata)
            // if(!rolesdata.includes(role.rolename)){
                // return res.status(200).send("not accessible");
            // }
            next();
        });
    
}

// 

// module.exports=checktoken;