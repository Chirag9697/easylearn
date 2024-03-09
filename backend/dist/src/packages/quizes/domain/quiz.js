"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quizes = void 0;
const objection_1 = require("objection");
class Quizes extends objection_1.Model {
    static get tableName() {
        return 'Quizes';
    }
}
exports.Quizes = Quizes;
//# sourceMappingURL=quiz.js.map