"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallannouncementc = exports.getallclassid = exports.getall = void 0;
const announcement_1 = require("../domain/announcement");
const getall = async () => {
    const allclasses = await announcement_1.announcements.query();
    console.log(allclasses);
    return allclasses;
};
exports.getall = getall;
const getallclassid = async (classid) => {
    const allstudents = await announcement_1.announcements.query().where('classid', '=', classid);
    return allstudents;
};
exports.getallclassid = getallclassid;
const getallannouncementc = async (classid, teacherid) => {
    const allannouncement = await announcement_1.announcements.query().where('classid', '=', classid).where('teacherid', '=', teacherid);
    return allannouncement;
};
exports.getallannouncementc = getallannouncementc;
//# sourceMappingURL=getall.js.map