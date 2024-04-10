"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findall = exports.get_all = void 0;
// import { Marks } from "../domain/Marks";
const Messages_1 = require("../domain/Messages");
const get_all = async () => {
    const allmessages = await Messages_1.Messages.query();
    return allmessages;
};
exports.get_all = get_all;
const findall = async (userid, otherid) => {
    const allmarks = await Messages_1.Messages.query().where(builder => { builder.where('senderid', userid).where('receiverid', otherid); }).orWhere(builder => { builder.where('senderid', otherid).where('receiverid', userid); }).orderBy("date", "asc");
    return allmarks;
};
exports.findall = findall;
//# sourceMappingURL=findall.js.map