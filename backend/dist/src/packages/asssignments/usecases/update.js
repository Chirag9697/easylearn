"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatebyid = void 0;
const assignments_1 = require("../domain/assignments");
const updatebyid = async (data, id) => {
    const assignmentsupdate = await assignments_1.assignments.query().findById(id).patch(data);
    return assignmentsupdate;
};
exports.updatebyid = updatebyid;
//# sourceMappingURL=update.js.map