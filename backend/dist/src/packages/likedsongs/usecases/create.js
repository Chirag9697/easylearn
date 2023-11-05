"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
// import { Playlists } from "../domain/Playlists";
const Likedsong_1 = require("../domain/Likedsong");
const create = async (data) => {
    const hel = await Likedsong_1.Likedsong.query().insert(data);
    console.log(hel);
    // return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map