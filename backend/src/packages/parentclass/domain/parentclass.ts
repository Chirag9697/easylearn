import { Model } from "objection";
export class parentclass extends Model{
    id?:String
    classname?:String
    classid?:String
    static get tableName(){
        return  'parentclass';
    }
}