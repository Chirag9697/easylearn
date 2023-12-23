import {users} from '../domain/users';

export const get_all=async()=>{
    const allpersons=await users.query();
    return allpersons;
}
