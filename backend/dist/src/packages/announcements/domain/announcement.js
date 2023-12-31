"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcements = void 0;
const objection_1 = require("objection");
class announcements extends objection_1.Model {
    static get tableName() {
        return 'announcements';
    }
}
exports.announcements = announcements;
//# sourceMappingURL=announcement.js.map