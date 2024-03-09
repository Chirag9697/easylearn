"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const quiz_1 = require("../domain/quiz");
const create = async (data) => {
    const hel = await quiz_1.Quizes.query().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map