import { Model } from "objection";
export class Quizes extends Model{
   id?:String
   classid?:String
   title?:String
   Marks?:String
   Duration?:String
   static get tableName(){
        return  'Quizes';
    }
}