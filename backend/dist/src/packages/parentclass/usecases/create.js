"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const parentclass_1 = require("../domain/parentclass");
const create = async (data) => {
    const hel = await parentclass_1.parentclass.query().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map