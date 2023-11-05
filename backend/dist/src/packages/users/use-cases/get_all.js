"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all = void 0;
const users_1 = require("../domain/users");
const get_all = async () => {
    const allpersons = await users_1.users.query();
    console.log(allpersons);
    // return allpersons;
};
exports.get_all = get_all;
//# sourceMappingURL=get_all.js.map