import { classes } from "../domain/class";
export const get_one=async(id:any)=>{
    const person=await classes.query().where('id','=',id);
    return person;
}
export const get_one2=async(email:any)=>{
    const person=await classes.query().first().where('email','=',email);
    return person;
}
