"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_one = void 0;
// import {users} from '../domain/users';
// -import { Playlists } from "../domain/Playlists";
// import { Music } from "../domain/Music";
const Likedsong_1 = require("../domain/Likedsong");
const get_one = async (id) => {
    const music = await Likedsong_1.Likedsong.query().first().where('musicid', '=', id);
    return music;
};
exports.get_one = get_one;
// export const get_onebyplaylistid=async(playlistid:any)=>{
// const music=await Music.query().where('playlistid','=',playlistid);
// return music;
// }
// export const get_one2=async(email:any)=>{
// const person=await users.query().first().where('email','=',email);
// return person;
// }
//# sourceMappingURL=get_one.js.map