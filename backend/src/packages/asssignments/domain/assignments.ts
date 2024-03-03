import { Model } from "objection";
export class assignments extends Model{
    id?:String
    qp?:String
    ans?:String
    classid?:String
    title?:String
    deadline?:Date
    static get tableName(){
        return  'assignments';
    }
}