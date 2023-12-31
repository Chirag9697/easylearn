import { Model } from "objection";
export class announcements extends Model{
    id?:String
    classid?:String
    teacherid?:String
    message?:String
    static get tableName(){
        return  'announcements';
    }
}