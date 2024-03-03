import { Model } from "objection";
export class attendance extends Model{
    // classname?:String
    id?:String
    studentid?:String
    date?:Date
    classid?:String
    status?:Number
    static get tableName(){
        return  'attendance';
    }
}