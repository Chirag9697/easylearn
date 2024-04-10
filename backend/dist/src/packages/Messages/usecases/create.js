"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
// import { Materials } from "../domain/Material";
const Messages_1 = require("../domain/Messages");
const create = async (data) => {
    const hel = await Messages_1.Messages.query().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map