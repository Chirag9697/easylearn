import { Model } from "objection";
export class Questions extends Model{
    id?:String
    questiontitle?:String
    optiona?:String
    optionb?:String
    optionc?:String
    optiond?:String
    answer?:String
    quizid?:Number
   static get tableName(){
        return  'Questions';
    }
}