"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_one = void 0;
const attendance_1 = require("../domain/attendance");
const get_one = async (id) => {
    const person = await attendance_1.attendance.query().first().where('id', '=', id);
    return person;
};
exports.get_one = get_one;
//# sourceMappingURL=get_one.js.map