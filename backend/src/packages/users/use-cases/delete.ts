import {users} from '../domain/users';

export const deleterecord=async(id:number)=>{
    const deleting=await users.query().deleteById(id);
    console.log(deleting);
    return deleting;
    // console.log(allpersons);
}
