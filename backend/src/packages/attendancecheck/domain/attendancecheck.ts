import { Model } from "objection";
export class attendancecheck extends Model{
    id?:String
    classid?:String
    teacherid?:String
    // message?:String
    date?:String
    static get tableName(){
        return  'attendancecheck';
    }
}