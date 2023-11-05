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
//lib
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const check_token_1 = require("../../../utils/check-token");
//local
// import ytdl from 'ytdl';
const fromusers = __importStar(require("../../users"));
const frommusic = __importStar(require("../../Music"));
const fromlikesongs = __importStar(require("../../likedsongs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.post('/', check_token_1.checktoken, async (req, res) => {
    try {
        const { musicid } = req.body;
        const { email } = req.user;
        const getuserid = await fromusers.get_one2(email);
        console.log(getuserid['id']);
        const data = { musicid: musicid, userid: getuserid['id'] };
        const likesong = await fromlikesongs.create(data);
        res.send({ success: "song successfully liked" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.get('/', check_token_1.checktoken, async (req, res) => {
    try {
        const { musicid } = req.body;
        const { email } = req.user;
        const getuserid = await fromusers.get_one2(email);
        console.log(getuserid['id']);
        const allsong = await fromlikesongs.get_all(getuserid['id']);
        const allmusic = [];
        for (let i = 0; i < allsong.length; i++) {
            const exactmusic = await frommusic.get_one(allsong[i].musicid);
            allmusic.push(Object.assign(Object.assign({}, exactmusic), allsong[i]));
        }
        res.send(allmusic);
    }
    catch (error) {
        res.send(error);
    }
});
exports.router.delete('/:id', check_token_1.checktoken, async (req, res) => {
    try {
        const { id } = req.params;
        const unlikesong = await fromlikesongs.deleterecordbymusicid(id);
        res.send({ success: "successfully unliked the song" });
    }
    catch (error) {
        res.send(error);
    }
});
//# sourceMappingURL=route.js.map