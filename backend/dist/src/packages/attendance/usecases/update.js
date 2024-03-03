"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatebyid = exports.update = void 0;
const attendance_1 = require("../../attendance/domain/attendance");
const update = async (data) => {
    // const newdata={first_name:data.first_name}
    const attendanceupdate = await attendance_1.attendance.query().patch(data).where('studentid', '=', data.studentid).where('classid', '=', data.classid).where('date', '=', data.Date);
    // 
    //obj
    return attendanceupdate;
    // console.log(userupdate);
};
exports.update = update;
const updatebyid = async (data, id) => {
    // const newdata={first_name:data.first_name}
    const attendanceupdate = await attendance_1.attendance.query().findById(id).patch(data);
    // console.loga()
    // 
    //obj
    return attendanceupdate;
    // console.log(userupdate);
};
exports.updatebyid = updatebyid;
//# sourceMappingURL=update.js.map