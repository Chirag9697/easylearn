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
exports.checktoken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const fromusers = __importStar(require("../packages/users"));
// import * as fromroles from '../packages/roles';
dotenv_1.default.config();
const checktoken = async (req, res, next) => {
    const token = req.headers['token'];
    console.log("token", token);
    if (!token) {
        return res.status(200).send({ error: "you need to login first" });
    }
    console.log(process.env.PRIVATE_KEY);
    await jsonwebtoken_1.default.verify(token.toString(), process.env.PRIVATE_KEY, async function (err, decoded) {
        console.log(decoded);
        if (err) {
            return res.status(200).send({ error: `${err.message}` });
        }
        // return decoded;
        // console.log("hello I am user",decoded);
        req.user = decoded;
        // console.log("using",req.user);
        const user = await fromusers.get_one2(decoded.email);
        console.log(user);
        // const role=await fromroles.get_one(user['id']);
        // console.log("roles",role)
        console.log("logged in");
        // console.log(rolesdata)
        // if(!rolesdata.includes(role.rolename)){
        // return res.status(200).send("not accessible");
        // }
        next();
    });
};
exports.checktoken = checktoken;
// 
// module.exports=checktoken;
//# sourceMappingURL=check-token.js.map