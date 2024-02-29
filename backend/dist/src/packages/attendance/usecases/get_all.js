"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallclassid = exports.getall = void 0;
const attendance_1 = require("../domain/attendance");
const getall = async () => {
    const allclasses = await attendance_1.attendance.query();
    console.log(allclasses);
    return allclasses;
};
exports.getall = getall;
const getallclassid = async (classid, studentid) => {
    const allstudents = await attendance_1.attendance.query().where('classid', '=', classid).where('studentid', '=', studentid).groupBy('classid');
    return allstudents;
};
exports.getallclassid = getallclassid;
//# sourceMappingURL=get_all.js.map