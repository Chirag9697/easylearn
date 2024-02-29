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
const multer_1 = __importDefault(require("multer"));
const frommaterials = __importStar(require("../../Materials"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// const upload=multer({dest:'/files'});
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
// const multer=require('multer')
exports.router.post('/', upload.single("file"), (0, check_token_1.checktoken)(['teacher']), async (req, res) => {
    try {
        const { title, classid, teacherid } = req.body;
        const fileName = req.file.filename;
        console.log(fileName);
        console.log(req.file);
        const data = { title: title, classid: classid, teacherid: teacherid, filename: fileName };
        const addfile = await frommaterials.create(data);
        console.log(addfile);
        res.send({ success: "successfully uploaded file" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.get('/:id', (0, check_token_1.checktoken)(['teacher', 'student']), async (req, res) => {
    try {
        const { id } = req.params;
        const getfile = await frommaterials.get_all(id);
        console.log(getfile);
        // console.log(addfile);
        res.send({ files: getfile });
    }
    catch (error) {
        res.send({ error: error });
    }
});
//# sourceMappingURL=route.js.map