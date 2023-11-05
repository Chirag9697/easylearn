"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all = void 0;
// import {users} from '../domain/users';
// import { platform } from "os";
// import { Playlists } from "../domain/Playlists";
// import { Music } from "../domain/Music";
const Likedsong_1 = require("../domain/Likedsong");
const get_all = async (id) => {
    const allMusic = await Likedsong_1.Likedsong.query().where('userid', '=', id);
    console.log(allMusic);
    // return allpersons;
    return allMusic;
};
exports.get_all = get_all;
//# sourceMappingURL=get_all.js.map