"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallclassteacherid = exports.getallclassstudentid = exports.getallclassid = exports.getall = void 0;
const class_1 = require("../domain/class");
const getall = async () => {
    const allclasses = await class_1.classes.query();
    console.log(allclasses);
    return allclasses;
};
exports.getall = getall;
const getallclassid = async (classid) => {
    const allstudents = await class_1.classes.query().where('classid', '=', classid);
    return allstudents;
};
exports.getallclassid = getallclassid;
const getallclassstudentid = async (studentid) => {
    const allclasseslist = await class_1.classes.query().select('id').where('studentid', '=', studentid).distinct();
    return allclasseslist;
};
exports.getallclassstudentid = getallclassstudentid;
const getallclassteacherid = async (teacherid) => {
    const allclasseslist = await class_1.classes.query().select('id').where('teacherid', '=', teacherid).distinct();
    return allclasseslist;
};
exports.getallclassteacherid = getallclassteacherid;
//# sourceMappingURL=getall.js.map