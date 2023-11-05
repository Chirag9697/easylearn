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
const check_token_1 = require("../../../utils/check-token");
//local
// import ytdl from 'ytdl';
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const youtube_search_api_1 = __importDefault(require("youtube-search-api"));
const frommusic = __importStar(require("../../Music"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
exports.router.post('/', async (req, res) => {
    try {
        const { playlistid, videoid, nameofmusic, url, duration } = req.body;
        const data = { playlistid: playlistid, videoid: videoid, nameofmusic: nameofmusic, url: url, duration: duration };
        console.log(data);
        const addtoplaylist = await frommusic.create(data);
        res.send({ success: "successfully added" });
    }
    catch (error) {
        res.send({ error: error });
    }
});
exports.router.get('/:videoid', async (req, res) => {
    const { videoid } = req.params;
    const videourl = `https://www.youtube.com/watch?v=${videoid}`;
    try {
        res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
        (0, ytdl_core_1.default)(videourl, { filter: "audioonly", quality: "highestaudio" }).pipe(res);
    }
    catch (error) {
        console.log(error);
        res.send({ "error": error });
    }
});
exports.router.get('/search/:searchquery', check_token_1.checktoken, async (req, res) => {
    console.log("search query");
    const { searchquery } = req.params;
    // console.log(searchquery);
    // const data1={name,email,password};
    // const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchquery}&key=AIzaSyB5BA_XNWjFnzgc4prxdeD2V_soTveqiBM`)
    // const data = await response.data;
    const data = await youtube_search_api_1.default.GetListByKeyword(`${searchquery}`, [false], [3]);
    // console.log(data);
    // try{
    //     const newuser=await fromauth.register(data1)
    //     console.log("New USER",newuser);
    //     return res.status(200).send(newuser);
    // }catch(error){
    //     return res.status(200).send({error:`${error}`});
    // }
    // console.log(data.items[0].id);
    // const videourl = `https://www.youtube.com/watch?v=${data.items[0].id}`;
    // let info = await ytdl.getInfo(data.items[0].id);
    //const info=await 
    // const format = ytdl.filterFormats(info.formats, 'audioonly');
    try {
        // const proc = new ffmpeg({ source: stream })
        // proc.setFfmpegPath('/Applications/ffmpeg')
        // proc.saveToFile('audio.mp3', (stdout, stderr) =>{
        // console.log('done');
        // })
        // ffmpeg().input("C://musically//backend//video.mp4").output('output.mp3').on('end', () => {
        //     console.log('audio download finished')
        // })
        // .on('error',(err)=>{
        //     console.log(err);
        // })
        // .run();
        // res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
        // ytdl(videourl, {filter:"audioonly", quality: "highestaudio" }).pipe(res);
        console.log(data);
        res.send(data);
    }
    catch (error) {
        // res.send("error");
        console.log(error);
        res.send({ "error": error });
    }
});
exports.router.get('/download/:videoid', (req, res) => {
    const { videoid } = req.params;
    const videourl = `https://www.youtube.com/watch?v=${videoid}`;
    try {
        res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
        (0, ytdl_core_1.default)(videourl, { filter: "audioonly" }).pipe(res);
    }
    catch (error) {
        console.log(error);
        res.send({ "error": error });
    }
});
exports.router.delete('/:id', check_token_1.checktoken, async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id", id);
        const deletesong = await frommusic.deleterecord(id);
        console.log(deletesong);
        res.send({ success: "song deleted" });
    }
    catch (error) {
        res.send(error);
    }
});
//# sourceMappingURL=route.js.map