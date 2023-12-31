"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const announcement_1 = require("../domain/announcement");
const create = async (data) => {
    const hel = await announcement_1.announcements.query().first().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map