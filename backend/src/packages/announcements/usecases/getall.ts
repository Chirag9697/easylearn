import { announcements } from "../domain/announcement";
export const getall=async()=>{
    const allclasses=await announcements.query();
    console.log(allclasses);
    return  allclasses;
}
export const getallclassid=async(classid)=>{
    const allstudents=await announcements.query().where('classid','=',classid);
    return allstudents;
}
export const getallannouncementc=async(classid,teacherid)=>{
    const allannouncement=await announcements.query().where('classid','=',classid).where('teacherid','=',teacherid);
    return allannouncement;
}
