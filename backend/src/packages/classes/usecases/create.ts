import { classes } from "../domain/class";
export const create=async(data:Partial<classes>)=>{
    const hel=await classes.query().first().insert(data);
    return hel;
}
