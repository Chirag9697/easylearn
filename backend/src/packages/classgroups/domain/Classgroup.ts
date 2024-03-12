import { Model } from "objection";
export class Classgroup extends Model{
    // classname?:String
    id?:String
    link?:String
    classid?:Number
    static get tableName(){
        return  'Classgroups';
    }
}