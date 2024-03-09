"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const question_1 = require("../domain/question");
const create = async (data) => {
    const hel = await question_1.Questions.query().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map