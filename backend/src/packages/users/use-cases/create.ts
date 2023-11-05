import {users} from '../domain/users';

export const create=async(data:Partial<users>)=>{
    const hel=await users.query().insert(data);
    return hel;
}
