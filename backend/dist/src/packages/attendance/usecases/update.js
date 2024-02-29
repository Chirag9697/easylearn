"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const attendance_1 = require("../../attendance/domain/attendance");
const update = async (data) => {
    // const newdata={first_name:data.first_name}
    const attendanceupdate = await attendance_1.attendance.query().patch(data).where('studentid', '=', data.studentid).where('classid', '=', data.classid);
    // 
    //obj
    return attendanceupdate;
    // console.log(userupdate);
};
exports.update = update;
//# sourceMappingURL=update.js.map