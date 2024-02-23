//lib
import express from 'express';
import knex from "knex";
import { Model } from 'objection';
import cors from 'cors';
import * as fromuser from './packages/users';
import * as fromauth from './packages/authentication';
import * as fromclass from './packages/classes';
import * as fromannouncement from './packages/announcements';
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

const initial="api/v1";
const users = {};

const socketToRoom = {};
app.use(`/${initial}/auth`,fromauth.router);
app.use(`/${initial}/classes`,fromclass.router);
app.use(`/${initial}/users`,fromuser.router)
app.use(`/${initial}/announcements`,fromannouncement.router);
io.on('connection', (socket) => {
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
    socket.on("join room2", roomID => {
  
      if (users[roomID]) {
          const length = users[roomID].length;
          console.log(roomID);
          console.log("joining room");
          if (length === 4) {
              socket.emit("room full");
              return;
          }
          users[roomID].push(socket.id);
      } else {
          users[roomID] = [socket.id];
      }
      socketToRoom[socket.id] = roomID;
      const usersInThisRoom = users[roomID].filter((id:any)=>id !== socket.id);

      socket.emit("all users", usersInThisRoom);
  });
    socket.on("ready",(roomname)=>{
      console.log("Ready");
      socket.broadcast.to(roomname).emit("ready");
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
    socket.on("sending signal", payload => {
      io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
   });

   socket.on("returning signal", payload => {
      io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
   });
  });
//   httpsServer.listen(3000);
server.listen(3001,()=>{
    console.log("listening to port 3000");
})