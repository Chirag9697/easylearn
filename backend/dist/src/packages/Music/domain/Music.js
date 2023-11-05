"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
const objection_1 = require("objection");
const Playlists_1 = require("../../playlists/domain/Playlists");
class Music extends objection_1.Model {
    static get tableName() {
        return 'music';
    }
}
exports.Music = Music;
Music.relationMappings = {
    owner: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Playlists_1.Playlists,
        join: {
            from: 'music.playlistid',
            to: 'Playlists.id'
        }
    }
};
//# sourceMappingURL=Music.js.map