"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallonlydate = exports.getallclassbyclassid = exports.getallclassiddate = exports.getallclassid = exports.getall = void 0;
const attendance_1 = require("../domain/attendance");
const getall = async () => {
    const allclasses = await attendance_1.attendance.query();
    console.log(allclasses);
    return allclasses;
};
exports.getall = getall;
const getallclassid = async (studentid) => {
    const allstudents = await attendance_1.attendance.query().select('classid', 'status').count('* as count').where('studentid', '=', studentid).groupBy('classid', 'status').where('status', '=', 1);
    return allstudents;
};
exports.getallclassid = getallclassid;
const getallclassiddate = async (classid, studentid, Date) => {
    const allstudents = await attendance_1.attendance.query().where('classid', '=', classid).where('studentid', '=', studentid).where('date', '=', Date);
    return allstudents;
};
exports.getallclassiddate = getallclassiddate;
const getallclassbyclassid = async (classid, studentid) => {
    const allstudents = await attendance_1.attendance.query().where('classid', '=', classid).where('studentid', '=', studentid);
    return allstudents;
};
exports.getallclassbyclassid = getallclassbyclassid;
const getallonlydate = async (Date) => {
    const allstudents = await attendance_1.attendance.query().where('date', '=', Date);
    return allstudents;
};
exports.getallonlydate = getallonlydate;
//# sourceMappingURL=get_all.js.map