import { classes } from "../domain/class";
export const getall=async()=>{
    const allpersons=await classes.query();
    console.log(allpersons);
    // return allpersons;
}
