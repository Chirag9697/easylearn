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

app.use(`/${initial}/auth`,fromauth.router);
app.use(`/${initial}/classes`,fromclass.router);
app.use(`/${initial}/users`,fromuser.router)
app.use(`/${initial}/announcements`,fromannouncement.router);
io.on('connection', (socket) => {
    // console.log('A user connected');
    socket.on("joinroom",(data)=>{
        socket.join(data);
        console.log("person is connected to room");
    })
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
    socket.on("typing",(args)=>{
        socket.to(args.room).emit("someonetyping",args);
    })
    socket.on("nottyping",(args)=>{
        socket.to(args.room).emit("noonetyping",args);
    })
    socket.on("sendmessage",(args)=>{
      socket.to(args.room).emit("receivemessage",args);
    })
  });
//   httpsServer.listen(3000);
server.listen(3001,()=>{
    console.log("listening to port 3000");
})