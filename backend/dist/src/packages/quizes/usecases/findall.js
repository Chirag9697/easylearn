"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findall = void 0;
const quiz_1 = require("../domain/quiz");
const findall = async () => {
    const allpersons = await quiz_1.Quizes.query();
    return allpersons;
};
exports.findall = findall;
//# sourceMappingURL=findall.js.map