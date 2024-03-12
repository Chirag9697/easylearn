import { Model } from "objection";
export class Marks extends Model{
    // classname?:String
    id?:String
    title?:String
    userid?:String
    sourceid?:String
    marks?:Number
    static get tableName(){
        return  'Marks';
    }
}