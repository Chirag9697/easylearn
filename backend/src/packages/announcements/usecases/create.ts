import { announcements } from "../domain/announcement";
export const create=async(data:Partial<announcements>)=>{
    const hel=await announcements.query().first().insert(data);
    return hel;
}
