"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_one2 = exports.get_one = void 0;
const announcement_1 = require("../domain/announcement");
const get_one = async (id) => {
    const person = await announcement_1.announcements.query().first().where('id', '=', id);
    return person;
};
exports.get_one = get_one;
const get_one2 = async (email) => {
    const person = await announcement_1.announcements.query().first().where('email', '=', email);
    return person;
};
exports.get_one2 = get_one2;
//# sourceMappingURL=find.js.map