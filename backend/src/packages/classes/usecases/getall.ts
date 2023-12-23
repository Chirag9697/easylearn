import { classes } from "../domain/class";
export const getall=async()=>{
    const allclasses=await classes.query();
    console.log(allclasses);
    return  allclasses;
    // return allpersons;
}
