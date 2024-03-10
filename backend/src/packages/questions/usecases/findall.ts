import { Questions } from "../domain/question";

export const findall=async()=>{
    const allquestions=await Questions.query();
    return allquestions;
}
export const getall=async(quizid)=>{
    const allquestions=await Questions.query().where('quizid','=',quizid);
    return allquestions;
}
