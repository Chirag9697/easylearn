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
const multer_1 = __importDefault(require("multer"));
const frompparentclass = __importStar(require("../../parentclass"));
const fromclasses = __importStar(require("../../classes"));
const fromassignments = __importStar(require("../../asssignments"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.router.get('/:studentid', (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        console.log("assignments obtain");
        const { studentid } = req.params;
        const allclassid = await fromclasses.getallclassstudentid(studentid);
        console.log(allclassid);
        const newdata = [];
        for (let i = 0; i < allclassid.length; i++) {
            const allassignment = await fromassignments.getallbyclassid(allclassid[i].id);
            console.log(allassignment);
            const classdetails = await frompparentclass.get_one(allclassid[i].id);
            for (let j = 0; j < allassignment.length; j++) {
                newdata.push(allassignment[j]);
            }
        }
        console.log("hello");
        console.log(newdata);
        res.send({ data: newdata });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.get('/:studentid/:classid', (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        console.log("assignments obtain");
        const { studentid, classid } = req.params;
        const newdata = [];
        const allassignment = await fromassignments.getallbyclassid(classid);
        const classdetails = await frompparentclass.get_one(classid);
        for (let j = 0; j < allassignment.length; j++) {
            newdata.push(allassignment[j]);
        }
        console.log(newdata);
        res.send({ assignment: newdata });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.put('/', upload.single("file"), (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        console.log("hello");
        const { id, classid, title, deadline, qp } = req.body;
        const ans = req.file.filename;
        const data = { id, qp, ans, classid, title, deadline };
        const updateassignment = await fromassignments.updatebyid(data, id);
        res.send({ success: "successfully uploaded assignments" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.post('/', upload.single("file"), (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        console.log("assignment");
        const { classid, title, deadline } = req.body;
        const qp = req.file.filename;
        const data = { qp, ans: "NA", classid, title, deadline };
        const updateassignment = await fromassignments.create(data);
        console.log(updateassignment);
        res.send({ success: "successfully created assignments" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
//# sourceMappingURL=route.js.map