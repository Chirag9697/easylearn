"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Likedsong = void 0;
const objection_1 = require("objection");
const Music_1 = require("../../Music");
const users_1 = require("../../users");
// import { Playlists } from "../../playlists/domain/Playlists";
class Likedsong extends objection_1.Model {
    // userid?:String
    // playlistid?:String
    static get tableName() {
        return 'likedsongs';
    }
}
exports.Likedsong = Likedsong;
Likedsong.relationMappings = {
    owner: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Music_1.Music,
        join: {
            from: 'likedsongs.musicid',
            to: 'music.id'
        }
    },
    owneruser: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: users_1.users,
        join: {
            from: 'likedsongs.userid',
            to: 'users.id'
        }
    }
};
//# sourceMappingURL=Likedsong.js.map