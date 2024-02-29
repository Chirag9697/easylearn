import { Model } from "objection";
export class attendance extends Model{
    // classname?:String
    id?:String
    studentid?:String
    date?:String
    classid?:String
    status?:Number
    static get tableName(){
        return  'attendance';
    }
}