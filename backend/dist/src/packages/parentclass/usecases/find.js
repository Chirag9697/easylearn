"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_one = void 0;
const parentclass_1 = require("../domain/parentclass");
const get_one = async (id) => {
    const person = await parentclass_1.parentclass.query().first().where('id', '=', id);
    return person;
};
exports.get_one = get_one;
//# sourceMappingURL=find.js.map