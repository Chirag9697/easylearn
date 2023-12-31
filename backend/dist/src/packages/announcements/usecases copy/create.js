"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const class_1 = require("../domain/class");
const create = async (data) => {
    const hel = await class_1.classes.query().first().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map