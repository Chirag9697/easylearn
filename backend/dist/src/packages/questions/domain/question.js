"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Questions = void 0;
const objection_1 = require("objection");
class Questions extends objection_1.Model {
    static get tableName() {
        return 'Questions';
    }
}
exports.Questions = Questions;
//# sourceMappingURL=question.js.map