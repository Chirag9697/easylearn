import { Model } from "objection";
export class users extends Model{
    name?:String
    email?:String
    password?:String
    role?:String

    static get tableName(){
        return  'users';
    }
}