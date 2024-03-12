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
const fromclasses = __importStar(require("../../classes"));
const fromquiz = __importStar(require("../../quizes"));
const fromquestions = __importStar(require("../../questions"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.post('/', (0, check_token_1.checktoken)(['teacher']), async (req, res) => {
    try {
        console.log(req.body);
        const { title, marks, timeof, dateof, mins, classid, questions } = req.body;
        // console.log(questions[0]);
        const data = { classid: classid, title: title, Marks: marks, time: dateof, duration: timeof };
        // const getallquiz=await fromquestions.findall();
        // console.log(getallquiz);
        const addquiz = await fromquiz.create(data);
        const { id } = addquiz;
        console.log(id);
        for (let i = 0; i < questions.length; i++) {
            const newdata = { quizid: Number(id), answer: "2", questiontitle: questions[i][0], optiona: questions[i][1], optionb: questions[i][2], optionc: questions[i][3], optiond: questions[i][4] };
            const addquestion = await fromquestions.create(newdata);
        }
        res.send({ success: "added quiz" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.get('/:userid', (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        const { userid } = req.params;
        const getallclasses = await fromclasses.getallclassstudentid(userid);
        let allquizes = [];
        for (let i = 0; i < getallclasses.length; i++) {
            const getquiz = await fromquiz.findone(getallclasses[i].id);
            console.log("getquiz", getquiz);
            if (getquiz) {
                allquizes.push(getquiz);
            }
        }
        console.log(allquizes);
        res.send({ success: allquizes });
    }
    catch (error) {
        res.send({ error: error });
    }
});
//# sourceMappingURL=route.js.map