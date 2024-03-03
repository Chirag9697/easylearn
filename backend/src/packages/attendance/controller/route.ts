//lib
import express from 'express';
import { checktoken } from '../../../utils/check-token';
import * as fromattendance from '../../attendance';
import * as fromparentclass from '../../parentclass';
// import Date
const app=express();
export const router=express.Router()

router.get('/:studentid',checktoken(['teacher','student']),async(req,res)=>{
    try{    
        console.log("gr")
        const{studentid}=req.params;
        const getattendance=await fromattendance.getallclassid(studentid);
        const newdata=[];
        for(let i=0;i<getattendance.length;i++){
            const getclass=await fromparentclass.get_one(getattendance[i].classid);
            console.log(getclass);
            const gettotalcountofclass=await fromattendance.getallclassbyclassid(getattendance[i].classid,studentid);
            const modifieddata={...getattendance[i],...getclass,totalcount:gettotalcountofclass.length};
            newdata.push(modifieddata);
        }
        res.send({attendance:newdata});

    }catch(error){
        res.send({error:error})
    }
})
router.get('/',checktoken(['teacher','student']),async(req,res)=>{
    try{    
        // const{classid,studentid}=req.params;
        const todaydate=new Date().toLocaleDateString();
        const getattendance=await fromattendance.getallonlydate(todaydate);
        res.send({attendance:getattendance});

    }catch(error){
        res.send({error:error})
    }
})

router.get('/student/:classid/:studentid',checktoken(['teacher','student']),async(req,res)=>{
    try{    
        const{classid,studentid}=req.params;
        const todaydate=new Date().toLocaleDateString();
        const getattendance=await fromattendance.getallclassiddate(classid,studentid,todaydate);
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
        const datetoday=new Date().toLocaleDateString();
        console.log(datetoday);
        const data={studentid,classid,date:datetoday,status};
        const getattendance=await fromattendance.create(data);
        console.log(getattendance);
        res.send({success:"attendance created successfully"});
    }catch(error){
        res.send({error:error})
    }
})
router.put('/',checktoken(['teacher','student']),async(req,res)=>{
    try{    
        const{id,status,classid,studentid}=req.body;
        const datetoday=new Date().toLocaleDateString();
        console.log(datetoday);
        const getall=await fromattendance.getall();
        console.log(getall);
        const data={id:id,studentid,classid,date:datetoday,status};
        console.log(id);
        console.log(data);
        const updateattendance=await fromattendance.updatebyid(data,id);
        console.log(updateattendance);
        res.send({success:"attendance marked successfully"});

    }catch(error){
        res.send({error:error})
    }
})



