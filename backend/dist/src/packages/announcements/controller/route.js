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
const fromannouncements = __importStar(require("../../announcements"));
const frompparentclass = __importStar(require("../../parentclass"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.get('/:classid/:teacherid', (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        if (req.user.role === "teacher") {
            const { classid, teacherid } = req.params;
            // console.log("hello",req.user);
            const allannouncement = await fromannouncements.getallannouncementc(classid, teacherid);
            console.log(allannouncement);
            res.send({ announcements: allannouncement });
        }
        else {
            const { classid } = req.params;
            const getteacherid = await frompparentclass.get_one(classid);
            const { teacherid } = getteacherid;
            const allannouncement = await fromannouncements.getallannouncementc(classid, teacherid);
            res.send({ announcements: allannouncement });
        }
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.delete('/:id', (0, check_token_1.checktoken)(['teacher']), async (req, res) => {
    try {
        const { id } = req.params;
        const delannouncement = await fromannouncements.deleterecord(id);
        res.send({ message: "successfully deleted" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.post('/', (0, check_token_1.checktoken)(['teacher']), async (req, res) => {
    try {
        const { teacherid, classid, message } = req.body;
        console.log("daedw", req.body);
        const newdata = { teacherid: teacherid, classid: classid, message: message };
        const addannouncement = await fromannouncements.create(newdata);
        const getallannouncement = await fromannouncements.getall();
        console.log("getall", getallannouncement);
        res.send({ message: "successfully announcement added" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
//# sourceMappingURL=route.js.map