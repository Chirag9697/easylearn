"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_onebyplaylistid = exports.get_one = void 0;
// import {users} from '../domain/users';
// -import { Playlists } from "../domain/Playlists";
const Music_1 = require("../domain/Music");
const get_one = async (id) => {
    const music = await Music_1.Music.query().first().where('id', '=', id);
    return music;
};
exports.get_one = get_one;
const get_onebyplaylistid = async (playlistid) => {
    console.log(playlistid);
    const music = await Music_1.Music.query().where('playlistid', '=', playlistid);
    return music;
};
exports.get_onebyplaylistid = get_onebyplaylistid;
// export const get_one2=async(email:any)=>{
// const person=await users.query().first().where('email','=',email);
// return person;
// }
//# sourceMappingURL=get_one.js.map