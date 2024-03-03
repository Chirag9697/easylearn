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
const dotenv_1 = __importDefault(require("dotenv"));
const check_token_1 = require("../../../utils/check-token");
//local
const fromcheckattendance = __importStar(require("../../attendancecheck"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.get('/:classid/:teacherid', (0, check_token_1.checktoken)(["teacher", "student"]), async (req, res) => {
    try {
        // console.log("hello")
        const { classid, teacherid } = req.params;
        console.log(classid);
        console.log(teacherid);
        const date = new Date().toLocaleDateString();
        const getattendance = await fromcheckattendance.get_all(classid, teacherid, date);
        console.log(getattendance);
        res.send({ attendance: getattendance });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.post('/', (0, check_token_1.checktoken)(["teacher", "student"]), async (req, res) => {
    try {
        console.log("adding attendance");
        const { classid, teacherid } = req.body;
        const date = new Date().toLocaleDateString();
        const data = { classid, teacherid, date };
        const getattendance = await fromcheckattendance.create(data);
        res.send({ success: "attendance created successfully" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
//# sourceMappingURL=route.js.map