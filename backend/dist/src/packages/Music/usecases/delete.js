"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleterecordbyplaylistod = exports.deleterecord = void 0;
// import {users} from '../domain/users';
// import { Playlists } from "../domain/Playlists";
const Music_1 = require("../domain/Music");
const deleterecord = async (id) => {
    console.log(id);
    const deleting = await Music_1.Music.query().deleteById(id);
    console.log(deleting);
    return deleting;
    // console.log(allpersons);
};
exports.deleterecord = deleterecord;
const deleterecordbyplaylistod = async (playlistid) => {
    const deleting = await Music_1.Music.query().delete().where("playlistid", "=", playlistid);
    console.log(deleting);
    return deleting;
    // console.log(allpersons);
};
exports.deleterecordbyplaylistod = deleterecordbyplaylistod;
//# sourceMappingURL=delete.js.map