import { classes } from "../domain/class";
export const getall=async()=>{
    const allclasses=await classes.query();
    console.log(allclasses);
    return  allclasses;
}
export const getallclassid=async(classid)=>{
    const allstudents=await classes.query().where('classid','=',classid);
    return allstudents;
}

export const getallclassstudentid=async(studentid)=>{
    const allclasseslist=await classes.query().select('id').where('studentid','=',studentid).distinct();
    return allclasseslist;
}
export const getallclassteacherid=async(teacherid)=>{
    const allclasseslist=await classes.query().select('id').where('teacherid','=',teacherid).distinct();
    return allclasseslist;
}


export const getallfaculties=async(studentid)=>{
    const allfacultylist=await classes.query().select('teacherid').where('studentid','=',studentid).distinct();
    return allfacultylist;
}
