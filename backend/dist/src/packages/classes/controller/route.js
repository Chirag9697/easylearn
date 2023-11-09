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
const fromusers = __importStar(require("../../users"));
const fromclass = __importStar(require("../../classes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.post('/', (0, check_token_1.checktoken)(["teacher"]), async (req, res) => {
    console.log("adding classroom");
    console.log(req.body);
    const { classname, members } = req.body;
    try {
        let i;
        for (i = 0; i < members.length; i++) {
            const getstudentdata = await fromusers.get_one(members[i]);
            console.log(getstudentdata);
            const getteacherid = await fromusers.get_one2(req.user.email);
            const data = { classname: classname, studentid: getstudentdata["id"], teacherid: getteacherid["id"] };
            const addclass = await fromclass.create(data);
        }
    }
    catch (error) {
        console.log(error);
        // return res.status(200).send({error:`${error}`});
    }
});
//# sourceMappingURL=route.js.map