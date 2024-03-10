"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
// import { Materials } from "../domain/Material";
const Marks_1 = require("../domain/Marks");
const create = async (data) => {
    const hel = await Marks_1.Marks.query().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map