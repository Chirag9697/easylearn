"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const users_1 = require("../domain/users");
const create = async (data) => {
    const hel = await users_1.users.query().insert(data);
    return hel;
};
exports.create = create;
//# sourceMappingURL=create.js.map