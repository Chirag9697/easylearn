"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all = void 0;
const Material_1 = require("../domain/Material");
const get_all = async (classid) => {
    const allmaterials = await Material_1.Materials.query().where('classid', '=', classid);
    console.log("ads", allmaterials);
    return allmaterials;
};
exports.get_all = get_all;
//# sourceMappingURL=get_all.js.map