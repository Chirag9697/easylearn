import { Model } from "objection";
export class Marks extends Model{
    // classname?:String
    id?:String
    title?:String
    userid?:String
    sourceid?:String
    static get tableName(){
        return  'Marks';
    }
}