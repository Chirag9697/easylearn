import { parentclass } from "../domain/parentclass";
export const getall=async()=>{
    const allclasses=await parentclass.query();
    console.log(allclasses);
    return  allclasses;
    // return allpersons;
}
