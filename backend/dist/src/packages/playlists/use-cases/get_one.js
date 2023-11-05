"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_one = void 0;
// import {users} from '../domain/users';
const Playlists_1 = require("../domain/Playlists");
const get_one = async (id) => {
    const person = await Playlists_1.Playlists.query().where('id', '=', id);
    return person;
};
exports.get_one = get_one;
// export const get_one2=async(email:any)=>{
// const person=await users.query().first().where('email','=',email);
// return person;
// }
//# sourceMappingURL=get_one.js.map