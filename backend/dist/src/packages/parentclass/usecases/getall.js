"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getall = void 0;
const parentclass_1 = require("../domain/parentclass");
const getall = async () => {
    const allclasses = await parentclass_1.parentclass.query();
    console.log(allclasses);
    return allclasses;
    // return allpersons;
};
exports.getall = getall;
//# sourceMappingURL=getall.js.map