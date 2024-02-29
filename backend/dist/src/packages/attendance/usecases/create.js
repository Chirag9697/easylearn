"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const attendance_1 = require("../domain/attendance");
const create = async (data) => {
    const hel = await attendance_1.attendance.query().first().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map