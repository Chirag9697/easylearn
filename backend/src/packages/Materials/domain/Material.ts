import { Model } from "objection";
export class Materials extends Model{
    id?:String
    title?:String
    filename?:String
    teacherid?:String
    classid?:String
    static get tableName(){
        return  'Materials';
    }
}