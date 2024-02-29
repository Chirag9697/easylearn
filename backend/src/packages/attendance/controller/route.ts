//lib
import express from 'express';
import { checktoken } from '../../../utils/check-token';
import * as fromattendance from '../../attendance';
// import Date
const app=express();
export const router=express.Router()


router.get('/:classid/:studentid',checktoken(['teacher','student']),async(req,res)=>{
    try{    
        const{classid,studentid}=req.params;
        const getattendance=await fromattendance.getallclassid(classid,studentid);
        res.send({attendance:getattendance});

    }catch(error){
        res.send({error:error})
    }
})
// router.post('/',checktoken(['teacher','student']),async(req,res)=>{
//     try{    
//         const{status,classid,studentid}=req.params;
//         const datetoday=new Date();
//         console.log(datetoday);
//         const data={studentid,classid,date:datetoday,status};
//         const getattendance=await fromattendance.create(data);
//         res.send({suucess:"attendance marked successfully"});

//     }catch(error){
//         res.send({error:error})
//     }
// })
router.post('/',checktoken(['teacher','student']),async(req,res)=>{
    try{    
        const{status,classid,studentid}=req.body;
        const datetoday=new Date();
        console.log(datetoday);
        
        const data={studentid,classid,Date:JSON.stringify(datetoday),status};
        const getattendance=await fromattendance.create(data);
        console.log(getattendance);
        res.send({success:"attendance created successfully"});
    }catch(error){
        res.send({error:error})
    }
})
router.put('/',checktoken(['teacher','student']),async(req,res)=>{
    try{    
        const{status,classid,studentid}=req.body;
        const datetoday=new Date();
        console.log(datetoday);
        const getall=await fromattendance.getall();
        console.log(getall);
        const data={studentid,classid,Date:JSON.stringify(datetoday),status};
        const updateattendance=await fromattendance.update(data);
        console.log(updateattendance);
        res.send({success:"attendance marked successfully"});

    }catch(error){
        res.send({error:error})
    }
})



