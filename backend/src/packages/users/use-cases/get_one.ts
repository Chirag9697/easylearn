import {users} from '../domain/users';

export const get_one=async(id:any)=>{
    const person=await users.query().first().where('id','=',id);
    return person;
}
export const get_one2=async(email:any)=>{
    const person=await users.query().first().where('email','=',email);
    return person;
}
