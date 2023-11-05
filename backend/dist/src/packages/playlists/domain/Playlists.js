"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlists = void 0;
const objection_1 = require("objection");
const users_1 = require("../../users");
class Playlists extends objection_1.Model {
    static get tableName() {
        return 'playlists';
    }
}
exports.Playlists = Playlists;
Playlists.relationMappings = {
    owner: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: users_1.users,
        join: {
            from: 'playlists.userid',
            to: 'users.id'
        }
    }
};
//# sourceMappingURL=Playlists.js.map