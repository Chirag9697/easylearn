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
const fromauth = __importStar(require("../../authentication"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.post('/register', async (req, res) => {
    console.log("registerhere");
    console.log(req.body);
    const { name, email, password, role } = req.body;
    const data1 = { name, email, password, role };
    console.log(data1);
    try {
        const newuser = await fromauth.register(data1);
        console.log("New USER", newuser);
        return res.status(200).send(newuser);
    }
    catch (error) {
        console.log(error);
        // return res.status(200).send({error:`${error}`});
    }
});
exports.router.delete('/deleteuser/:id', async (req, res) => {
    console.log("delete this user please");
    const { id } = req.params;
    console.log("id of the user", id);
    try {
        await fromauth.deleteuser(parseInt(id));
        res.status(200).send("user deleted");
    }
    catch (error) {
        return res.status(200).send({ error: `${error}` });
    }
});
exports.router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // console.log("hello")
    const data = { email, password };
    console.log(data);
    try {
        const tok = await fromauth.login(data);
        console.log(tok);
        return res.status(200).json(tok);
        //    return res.send();
    }
    catch (error) {
        console.log(error);
        return res.status(200).send({ error: `${error}` });
    }
});
//# sourceMappingURL=route.js.map