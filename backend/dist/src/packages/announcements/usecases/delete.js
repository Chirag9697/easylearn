"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleterecordbyclassid = exports.deleterecord = void 0;
const announcement_1 = require("../domain/announcement");
const deleterecord = async (id) => {
    const deleting = await announcement_1.announcements.query().deleteById(id);
    console.log(deleting);
    return deleting;
    // console.log(allpersons);
};
exports.deleterecord = deleterecord;
const deleterecordbyclassid = async (id) => {
    const deleting = await announcement_1.announcements.query().delete().where("classid", "like", id);
    console.log(deleting);
    return deleting;
};
exports.deleterecordbyclassid = deleterecordbyclassid;
//# sourceMappingURL=delete.js.map