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
const check_token_1 = require("../../../utils/check-token");
const frommarks = __importStar(require("../../Marks"));
// import Date
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.post('/', (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        const { title, sourceid, userid, marks } = req.body;
        const data = { title, sourceid, userid, marks };
        const addmarks = await frommarks.create(data);
        console.log("hello");
        res.send({ success: "marks are added" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.get('/:userid', (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        const { userid } = req.params;
        const getmarks = await frommarks.findall(userid);
        // const marks=getmarks.Marks;
        // console.log("getmarks",getmarks);
        res.send({ success: getmarks });
    }
    catch (error) {
        res.send({ error: error });
    }
});
//# sourceMappingURL=route.js.map