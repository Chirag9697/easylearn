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
const fromattendance = __importStar(require("../../attendance"));
const fromparentclass = __importStar(require("../../parentclass"));
// import Date
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.get('/:studentid', (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        console.log("gr");
        const { studentid } = req.params;
        const getattendance = await fromattendance.getallclassid(studentid);
        const newdata = [];
        for (let i = 0; i < getattendance.length; i++) {
            const getclass = await fromparentclass.get_one(getattendance[i].classid);
            console.log(getclass);
            const gettotalcountofclass = await fromattendance.getallclassbyclassid(getattendance[i].classid, studentid);
            const modifieddata = Object.assign(Object.assign(Object.assign({}, getattendance[i]), getclass), { totalcount: gettotalcountofclass.length });
            newdata.push(modifieddata);
        }
        res.send({ attendance: newdata });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.get('/', (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        // const{classid,studentid}=req.params;
        const todaydate = new Date().toLocaleDateString();
        const getattendance = await fromattendance.getallonlydate(todaydate);
        res.send({ attendance: getattendance });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.get('/student/:classid/:studentid', (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        const { classid, studentid } = req.params;
        const todaydate = new Date().toLocaleDateString();
        const getattendance = await fromattendance.getallclassiddate(classid, studentid, todaydate);
        res.send({ attendance: getattendance });
    }
    catch (error) {
        res.send({ error: error });
    }
});
// router.post('/',checktoken(['teacher','student']),async(req,res)=>{
//     try{    
//         const{status,classid,studentid}=req.params;
//         const datetoday=new Date();
//         console.log(datetoday);
//         const data={studentid,classid,date:datetoday,status};
//         const getattendance=await fromattendance.create(data);
//         res.send({suucess:"attendance marked successfully"});
//     }catch(error){
//         res.send({error:error})
//     }
// })
exports.router.post('/', (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        const { status, classid, studentid } = req.body;
        const datetoday = new Date().toLocaleDateString();
        console.log(datetoday);
        const data = { studentid, classid, date: datetoday, status };
        const getattendance = await fromattendance.create(data);
        console.log(getattendance);
        res.send({ success: "attendance created successfully" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.put('/', (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        const { id, status, classid, studentid } = req.body;
        const datetoday = new Date().toLocaleDateString();
        console.log(datetoday);
        const getall = await fromattendance.getall();
        console.log(getall);
        const data = { id: id, studentid, classid, date: datetoday, status };
        console.log(id);
        console.log(data);
        const updateattendance = await fromattendance.updatebyid(data, id);
        console.log(updateattendance);
        res.send({ success: "attendance marked successfully" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
//# sourceMappingURL=route.js.map