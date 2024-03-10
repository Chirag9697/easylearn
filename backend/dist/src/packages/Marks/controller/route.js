"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//lib
const express_1 = __importDefault(require("express"));
// import Date
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.post('/', async (req, res) => {
    try {
        // const{title,sourceid,userid}=req.body;
        console.log("hello");
        res.send({ success: "marks are added" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
//# sourceMappingURL=route.js.map