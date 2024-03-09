"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findall = void 0;
const question_1 = require("../domain/question");
const findall = async () => {
    const allpersons = await question_1.Questions.query();
    return allpersons;
};
exports.findall = findall;
//# sourceMappingURL=findall.js.map