"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleterecord = void 0;
const parentclass_1 = require("../domain/parentclass");
const deleterecord = async (id) => {
    const deleting = await parentclass_1.parentclass.query().deleteById(id);
    console.log(deleting);
    return deleting;
    // console.log(allpersons);
};
exports.deleterecord = deleterecord;
//# sourceMappingURL=delete.js.map