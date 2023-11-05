"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const objection_1 = require("objection");
class users extends objection_1.Model {
    static get tableName() {
        return 'users';
    }
}
exports.users = users;
//# sourceMappingURL=users.js.map