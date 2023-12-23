"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getall = void 0;
const class_1 = require("../domain/class");
const getall = async () => {
    const allclasses = await class_1.classes.query();
    console.log(allclasses);
    return allclasses;
    // return allpersons;
};
exports.getall = getall;
//# sourceMappingURL=getall.js.map