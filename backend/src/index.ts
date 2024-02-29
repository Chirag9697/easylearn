//lib
import express from 'express';
import knex from "knex";
import { Model } from 'objection';
import cors from 'cors';
import * as fromuser from './packages/users';
import * as fromauth from './packages/authentication';
import * as fromclass from './packages/classes';
import * as fromannouncement from './packages/announcements';
import * as frommaterial from './packages/Materials';
import * as fromattendance from './packages/attendance';
import http from 'http';

import { Server } from 'socket.io';

import {development} from '../knexfile';

export const app=express()
const connection = development;

const server=http.createServer(app);


const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
// const io = new Server(/server);
Model.knex(knex(connection));

app.use(cors());
app.use(express.json());
app.use("/files", express.static("files"));

const initial="api/v1";
const users = {};

const socketToRoom = {};
app.use(`/${initial}/auth`,fromauth.router);
app.use(`/${initial}/classes`,fromclass.router);
app.use(`/${initial}/users`,fromuser.router)
app.use(`/${initial}/announcements`,fromannouncement.router);
app.use(`/${initial}/materials`,frommaterial.router);
app.use(`/${initial}/attendance`,fromattendance.router);
io.on('connection', (socket) => {
    socket.emit('me',socket.id);
    socket.on("joinroom",(data)=>{
        var rooms=io.sockets.adapter.rooms;
        var room=rooms.get(data);
        if(room==undefined){
          socket.join(data);
          socket.emit("created");
        }
        else{
          socket.join(data);
          socket.emit("joined");
        }
        console.log("rooms");
        console.log(rooms);
    })
    socket.on('calluser',({userToCall,signalData,from,name})=>{
      console.log("calluserevnet");
      console.log(userToCall,signalData,from,name);
      socket.in(userToCall).emit("calluser",{signal:signalData,from,name});
    })
    socket.on("answercall",(data)=>{
      io.to(data.to).emit("callaccepted",data.signal);
    })
    socket.on("ready",(roomname)=>{
      console.log("Ready");
      socket.broadcast.to(roomname).emit("ready");
    })
    socket.on("attendancecreated",(id)=>{
      socket.in(id).emit("attendancestarted");
    })
    socket.on("attendanceended",(id)=>{
      socket.in(id).emit("attendancefinish");
    })
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
    socket.on("typing",(args)=>{
      console.log("typing evnet");
      // console.log(args);
        socket.in(args).emit("someonetyping",args);
    })
    socket.on("nottyping",(args)=>{
        socket.in(args).emit("noonetyping",args);
    })
    socket.on("sendmessage",(args)=>{
      console.log("hsdaewd",args);
      socket.broadcast.to(args.room).emit("receivemessage",args);
    })
  });
//   httpsServer.listen(3000);
server.listen(3001,()=>{
    console.log("listening to port 3001");
})