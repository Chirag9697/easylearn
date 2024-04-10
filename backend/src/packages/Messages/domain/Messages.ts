import { Model } from "objection";
export class Messages extends Model{
    // classname?:String
    id?:String
    message?:String
    senderid?:String
    receiverid?:String
    data?:Date
    static get tableName(){        
        return  'Messages';
    }
}