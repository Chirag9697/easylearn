"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getalldoubts = exports.findall = exports.get_all = void 0;
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
const getalldoubts = async (userid) => {
    const alldoubts1 = await Messages_1.Messages.query().select('receiverid').distinct("receiverid").where('senderid', userid).orderBy("date", "asc");
    const alldoubts2 = await Messages_1.Messages.query().select('senderid').distinct("senderid").where('receiverid', userid).orderBy("date", "asc");
    // console.log(alldoubts);
    let doubtstog = [];
    for (let i = 0; i < alldoubts1.length; i++) {
        if (doubtstog.includes(alldoubts1[i].receiverid) == false) {
            doubtstog.push(alldoubts1[i].receiverid);
        }
    }
    for (let i = 0; i < alldoubts2.length; i++) {
        if (doubtstog.includes(alldoubts2[i].senderid) == false) {
            doubtstog.push(alldoubts2[i].senderid);
        }
    }
    console.log(doubtstog);
    return doubtstog;
};
exports.getalldoubts = getalldoubts;
//# sourceMappingURL=findall.js.map