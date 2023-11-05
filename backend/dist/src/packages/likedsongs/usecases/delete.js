"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleterecordbymusicid = void 0;
// import {users} from '../domain/users';
// import { Playlists } from "../domain/Playlists";
// import { Music } from "../domain/Music";
const Likedsong_1 = require("../domain/Likedsong");
const deleterecordbymusicid = async (musicid) => {
    // console.log(id);
    const deleting = await Likedsong_1.Likedsong.query().delete().where('id', '=', musicid);
    console.log(deleting);
    return deleting;
    // console.log(allpersons);
};
exports.deleterecordbymusicid = deleterecordbymusicid;
//# sourceMappingURL=delete.js.map