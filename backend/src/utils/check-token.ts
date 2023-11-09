import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as fromusers from '../packages/users';
// import * as fromroles from '../packages/roles';
dotenv.config();
export const checktoken=(rolesdata:any)=>{
    return async(req,res,next)=>{
        const token=req.headers['x-access-token'];
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
            
            req.user=decoded;
            console.log("using",req.user);
            const user=await fromusers.get_one2(decoded.email);
            console.log(user);

            if(!rolesdata.includes(user.role)){
                return res.status(200).send({error:"not accessible"});
            }
            next();
        });
    }
}

// 

// module.exports=checktoken;