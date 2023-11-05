"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
//local
// import ytdl from 'ytdl';
const fromplaylist = __importStar(require("../../playlists"));
const frommusic = __importStar(require("../../Music"));
const fromusers = __importStar(require("../../users"));
// import { checktoken } from '../../../utils/check-token';
const check_token_1 = require("../../../utils/check-token");
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.get('/users/', check_token_1.checktoken, async (req, res) => {
    console.log("helo");
    // console.log(req.user);
    try {
        const { email } = req.user;
        // console.log(email);
        const getuserid = await fromusers.get_one2(email);
        console.log(getuserid['id']);
        const allplaylist = await fromplaylist.get_all(getuserid['id']);
        console.log("allplaylist", allplaylist);
        res.send(allplaylist);
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.get('/:playlistid', async (req, res) => {
    try {
        const { playlistid } = req.params;
        const allsongsofplaylist = await frommusic.get_onebyplaylistid(playlistid);
        // console.log(all)
        res.send(allsongsofplaylist);
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.delete('/:id', check_token_1.checktoken, async (req, res) => {
    try {
        const { id } = req.params;
        // const deletesongs=await frommusic.deleterecordbyplaylistod(id);
        const allplaylist = await fromplaylist.deleterecord(id);
        console.log("🚀 ~ file: route.ts:50 ~ router.delete ~ allplaylist:", allplaylist);
        res.send({ success: "deleting successfully" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.post('/', check_token_1.checktoken, async (req, res) => {
    console.log("afsdfas");
    try {
        const { nameofplaylist } = req.body;
        console.log(req.body);
        const { email } = req.user;
        console.log(email);
        const getuserid = await fromusers.get_one2(email);
        // console.log(getuserid['id']);
        const data = { nameofplaylist: nameofplaylist, userid: getuserid['id'] };
        const allplaylist = await fromplaylist.create(data);
        res.send(allplaylist);
    }
    catch (error) {
        res.send({ error: error });
    }
});
//# sourceMappingURL=route.js.map