"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
// import { Playlists } from "../domain/Playlists";
const Music_1 = require("../domain/Music");
const create = async (data) => {
    const hel = await Music_1.Music.query().insert(data);
    console.log(hel);
    // return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map