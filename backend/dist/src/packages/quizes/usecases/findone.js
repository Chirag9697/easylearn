"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findone = void 0;
const quiz_1 = require("../domain/quiz");
const findone = async (id) => {
    const allquizzes = await quiz_1.Quizes.query().first().where('classid', '=', id);
    return allquizzes;
};
exports.findone = findone;
//# sourceMappingURL=findone.js.map