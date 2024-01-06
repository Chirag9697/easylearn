"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_one2 = exports.get_one = void 0;
const class_1 = require("../domain/class");
const get_one = async (id) => {
    const person = await class_1.classes.query().where('id', '=', id);
    return person;
};
exports.get_one = get_one;
const get_one2 = async (email) => {
    const person = await class_1.classes.query().first().where('email', '=', email);
    return person;
};
exports.get_one2 = get_one2;
//# sourceMappingURL=find.js.map