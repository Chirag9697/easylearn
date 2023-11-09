import { Model } from "objection";
export class classes extends Model{
    classname?:String
    id?:String
    studentid?:String
    teacherid?:String
    static get tableName(){
        return  'classes';
    }
}