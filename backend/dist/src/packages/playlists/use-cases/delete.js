"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleterecord = void 0;
// import {users} from '../domain/users';
const Playlists_1 = require("../domain/Playlists");
const deleterecord = async (id) => {
    console.log("id", id);
    const deleting = await Playlists_1.Playlists.query().deleteById(id);
    console.log(deleting);
    return deleting;
    // console.log(allpersons);
};
exports.deleterecord = deleterecord;
//# sourceMappingURL=delete.js.map