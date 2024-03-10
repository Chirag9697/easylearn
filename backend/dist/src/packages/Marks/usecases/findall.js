"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findall = exports.get_all = void 0;
const Marks_1 = require("../domain/Marks");
const get_all = async () => {
    const allmarks = await Marks_1.Marks.query();
    return allmarks;
};
exports.get_all = get_all;
const findall = async (userid) => {
    const allmarks = await Marks_1.Marks.query().where('userid', '=', userid);
    return allmarks;
};
exports.findall = findall;
//# sourceMappingURL=findall.js.map