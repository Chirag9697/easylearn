"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//lib
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
// router.post('/',checktoken(['teacher','student']),(req,res)=>{
//     try{
//         const{questions}=req.body;
//         console.log(questions);
//         res.send({success:"added questions"});
//     }catch(error){
//         res.send({error:error});
//     }
// })
//# sourceMappingURL=route.js.map