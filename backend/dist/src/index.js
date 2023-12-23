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
exports.app = void 0;
//lib
const express_1 = __importDefault(require("express"));
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const fromuser = __importStar(require("./packages/users"));
const fromauth = __importStar(require("./packages/authentication"));
const fromclass = __importStar(require("./packages/classes"));
const knexfile_1 = require("../knexfile");
exports.app = (0, express_1.default)();
// const development=require("../knexfile");
const connection = knexfile_1.development;
var cors = require('cors');
objection_1.Model.knex((0, knex_1.default)(connection));
exports.app.use(cors());
exports.app.use(express_1.default.json());
const initial = "api/v1";
exports.app.use(`/${initial}/auth`, fromauth.router);
exports.app.use(`/${initial}/classes`, fromclass.router);
exports.app.use(`/${initial}/users`, fromuser.router);
exports.app.listen(3000, () => {
    console.log("listening on port 3000");
});
// module.exports=app;
//# sourceMappingURL=index.js.map