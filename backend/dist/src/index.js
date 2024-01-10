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
const fromannouncement = __importStar(require("./packages/announcements"));
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
exports.app.use(`/${initial}/announcements`, fromannouncement.router);
io.on('connection', (socket) => {
    socket.on("joinroom", (data) => {
        var rooms = io.sockets.adapter.rooms;
        var room = rooms.get(data);
        if (room == undefined) {
            socket.join(data);
            socket.emit("created");
        }
        else {
            socket.join(data);
            socket.emit("joined");
        }
        console.log("rooms");
        console.log(rooms);
    });
    socket.on("ready", (roomname) => {
        console.log("Ready");
        socket.broadcast.to(roomname).emit("ready");
    });
    socket.on("candidate", (candidate, roomName) => {
        console.log("candidate");
        socket.broadcast.to(roomName).emit("candidate", candidate);
    });
    socket.on("offer", (offer, roomName) => {
        console.log("offer");
        console.log(offer);
        socket.broadcast.to(roomName).emit("offer", offer);
    });
    socket.on("answer", (answer, roomName) => {
        console.log("answer");
        socket.broadcast.to(roomName).emit("answer", answer);
    });
    socket.on('negotiationneeded', (roomname, offer) => {
        socket.to(roomname).emit("negotiationneeded", offer);
    });
    socket.on('negotiationdone', (roomname, offer) => {
        socket.to(roomname).emit("negotiationdone", offer);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on("typing", (args) => {
        socket.broadcast.to(args.room).emit("someonetyping", args);
    });
    socket.on("nottyping", (args) => {
        socket.broadcast.to(args.room).emit("noonetyping", args);
    });
    socket.on("sendmessage", (args) => {
        socket.broadcast.to(args.room).emit("receivemessage", args);
    });
});
//   httpsServer.listen(3000);
server.listen(3001, () => {
    console.log("listening to port 3000");
});
//# sourceMappingURL=index.js.map