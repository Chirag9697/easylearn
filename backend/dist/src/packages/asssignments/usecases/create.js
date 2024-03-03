"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const assignments_1 = require("../domain/assignments");
const create = async (data) => {
    const hel = await assignments_1.assignments.query().first().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map