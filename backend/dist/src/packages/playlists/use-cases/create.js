"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const Playlists_1 = require("../domain/Playlists");
const create = async (data) => {
    const hel = await Playlists_1.Playlists.query().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map