"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_one = void 0;
const parentclass_1 = require("../domain/parentclass");
const get_one = async (classid) => {
    const person = await parentclass_1.parentclass.query().first().where('id', '=', classid);
    return person;
};
exports.get_one = get_one;
//# sourceMappingURL=get_one.js.map