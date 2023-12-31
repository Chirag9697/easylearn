import { announcements } from "../domain/announcement";
export const deleterecord=async(id:number)=>{
    const deleting=await announcements.query().deleteById(id);
    console.log(deleting);
    return deleting;
    // console.log(allpersons);
}
