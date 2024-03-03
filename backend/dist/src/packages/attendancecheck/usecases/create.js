"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const attendancecheck_1 = require("../domain/attendancecheck");
const create = async (data) => {
    const hel = await attendancecheck_1.attendancecheck.query().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map