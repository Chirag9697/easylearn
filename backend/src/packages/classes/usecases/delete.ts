import { classes } from "../domain/class";
export const deleterecord=async(id:number)=>{
    const deleting=await classes.query().deleteById(id);
    console.log(deleting);
    return deleting;
    // console.log(allpersons);
}
export const deleterecordbyclassid=async(id:number)=>{
    const deleting=await classes.query().delete().where("classid","like",id);
    console.log(deleting);
    return deleting;
}
