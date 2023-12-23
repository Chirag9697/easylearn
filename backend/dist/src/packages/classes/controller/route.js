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
const fromparentclass = __importStar(require("../../parentclass"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.post('/', (0, check_token_1.checktoken)(["teacher"]), async (req, res) => {
    console.log("adding classroom");
    console.log(req.body);
    const { classname, members } = req.body;
    const data1 = { classname: classname };
    const addclass = await fromparentclass.create(data1);
    console.log("edasd", addclass);
    try {
        // for(let i=0;i<members.length;i++){
        // const getteacherid=await fromusers.get_one2(req.user.email);
        // const data2={teacherid:getteacherid["id"],studentid:members[i],classid:addclass['parentclass']['id']};
        // const addclass2=await fromclass.create(data2);
        // }
        res.send("class added");
    }
    catch (error) {
        console.log(error);
        // return res.status(200).send({error:`${error}`});
    }
});
exports.router.get('/', (0, check_token_1.checktoken)(["teacher"]), async (req, res) => {
    try {
        const getteacherid = await fromusers.get_one2(req.user.email);
        const getallclasses = await fromclass.getall();
        let getmyclasses = [];
        for (let i = 0; i < getallclasses.length; i++) {
            // console.log(getallclasses[i].teacherid)
            // console.log(getteacherid["id"]);
            if (getallclasses[i].teacherid.localeCompare(getteacherid["id"]) === 0) {
                getmyclasses.push(getallclasses[i]);
            }
            ;
        }
        console.log(getmyclasses);
        res.send({ myclasses: getmyclasses });
    }
    catch (error) {
        res.send({ error: error });
    }
});
//# sourceMappingURL=route.js.map