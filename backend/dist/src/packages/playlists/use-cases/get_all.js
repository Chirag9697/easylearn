"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all = void 0;
// import {users} from '../domain/users';
// import { platform } from "os";
const Playlists_1 = require("../domain/Playlists");
const get_all = async (userid) => {
    const allplaylists = await Playlists_1.Playlists.query().where('userid', '=', userid);
    console.log(allplaylists);
    return allplaylists;
};
exports.get_all = get_all;
//# sourceMappingURL=get_all.js.map