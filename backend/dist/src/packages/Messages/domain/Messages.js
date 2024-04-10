"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
const objection_1 = require("objection");
class Messages extends objection_1.Model {
    static get tableName() {
        return 'Messages';
    }
}
exports.Messages = Messages;
//# sourceMappingURL=Messages.js.map