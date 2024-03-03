"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallbyclassid = exports.getall = void 0;
const assignments_1 = require("../domain/assignments");
const getall = async () => {
    const allassignment = await assignments_1.assignments.query();
    // console.log(allclasses);
    return allassignment;
};
exports.getall = getall;
const getallbyclassid = async (classid) => {
    const allassignment = await assignments_1.assignments.query().where('classid', '=', classid);
    // console.log(allclasses);
    return allassignment;
};
exports.getallbyclassid = getallbyclassid;
//# sourceMappingURL=get_all.js.map