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
