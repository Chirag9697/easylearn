"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getall = exports.findall = void 0;
const question_1 = require("../domain/question");
const findall = async () => {
    const allquestions = await question_1.Questions.query();
    return allquestions;
};
exports.findall = findall;
const getall = async (quizid) => {
    const allquestions = await question_1.Questions.query().where('quizid', '=', quizid);
    return allquestions;
};
exports.getall = getall;
//# sourceMappingURL=findall.js.map