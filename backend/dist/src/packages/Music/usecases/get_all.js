"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all = void 0;
// import {users} from '../domain/users';
// import { platform } from "os";
// import { Playlists } from "../domain/Playlists";
const Music_1 = require("../domain/Music");
const get_all = async () => {
    const allMusic = await Music_1.Music.query();
    console.log(allMusic);
    // return allpersons;
};
exports.get_all = get_all;
//# sourceMappingURL=get_all.js.map