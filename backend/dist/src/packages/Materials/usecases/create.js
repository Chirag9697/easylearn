"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const Material_1 = require("../domain/Material");
const create = async (data) => {
    const hel = await Material_1.Materials.query().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map