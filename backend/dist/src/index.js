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
const cors_1 = __importDefault(require("cors"));
const fromuser = __importStar(require("./packages/users"));
const fromauth = __importStar(require("./packages/authentication"));
const fromclass = __importStar(require("./packages/classes"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const knexfile_1 = require("../knexfile");
exports.app = (0, express_1.default)();
const connection = knexfile_1.development;
const server = http_1.default.createServer(exports.app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
// const io = new Server(/server);
objection_1.Model.knex((0, knex_1.default)(connection));
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
const initial = "api/v1";
exports.app.use(`/${initial}/auth`, fromauth.router);
exports.app.use(`/${initial}/classes`, fromclass.router);
exports.app.use(`/${initial}/users`, fromuser.router);
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on("typing", (args) => {
        // console.log(args);
        socket.broadcast.emit("someonetyping", args);
    });
    socket.on("nottyping", (args) => {
        // console.log(args);
        socket.broadcast.emit("noonetyping", args);
    });
    socket.on("sendmessage", (args) => {
        socket.broadcast.emit("receivemessage", args);
    });
});
//   httpsServer.listen(3000);
server.listen(3001, () => {
    console.log("listening to port 3000");
});
//# sourceMappingURL=index.js.map