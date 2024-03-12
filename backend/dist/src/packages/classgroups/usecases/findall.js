"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findall = exports.get_all = void 0;
const classgroup_1 = require("../domain/classgroup");
const get_all = async () => {
    const allmarks = await classgroup_1.Classgroup.query();
    return allmarks;
};
exports.get_all = get_all;
const findall = async (classid) => {
    const allmarks = await classgroup_1.Classgroup.query().where('classid', '=', classid);
    return allmarks;
};
exports.findall = findall;
//# sourceMappingURL=findall.js.map