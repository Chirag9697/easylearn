"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all = void 0;
const attendancecheck_1 = require("../domain/attendancecheck");
const get_all = async (classid, teacherid, date) => {
    const allrecords = await attendancecheck_1.attendancecheck.query().where('classid', '=', classid).where('teacherid', '=', teacherid).where('date', '=', date);
    return allrecords;
};
exports.get_all = get_all;
//# sourceMappingURL=get_all.js.map