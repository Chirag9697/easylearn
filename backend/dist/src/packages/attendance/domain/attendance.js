"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendance = void 0;
const objection_1 = require("objection");
class attendance extends objection_1.Model {
    static get tableName() {
        return 'attendance';
    }
}
exports.attendance = attendance;
//# sourceMappingURL=attendance.js.map