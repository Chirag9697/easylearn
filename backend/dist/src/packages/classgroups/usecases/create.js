"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
// import { Materials } from "../domain/Material";
const classgroup_1 = require("../domain/classgroup");
const create = async (data) => {
    const hel = await classgroup_1.Classgroup.query().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map