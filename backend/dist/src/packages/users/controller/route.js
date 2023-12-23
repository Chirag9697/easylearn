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
const fromusers = __importStar(require("../../users"));
//local
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.get('/', (0, check_token_1.checktoken)(["teacher"]), async (req, res) => {
    try {
        const allusers = await fromusers.get_all();
        const allstudents = [];
        for (let i = 0; i < allusers.length; i++) {
            if (allusers[i].role === "student") {
                allstudents.push(allusers[i]);
            }
        }
        // console.log(allusers);
        res.send({ allstudents: allstudents });
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.router.get('/getmydetails', (0, check_token_1.checktoken)(["teacher"]), async (req, res) => {
    try {
        const getmyacc = await fromusers.get_one2(req.user.email);
        res.send({ details: getmyacc });
    }
    catch (error) {
        res.send({ error: error });
    }
});
//# sourceMappingURL=route.js.map