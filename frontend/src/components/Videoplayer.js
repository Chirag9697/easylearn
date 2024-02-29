import React, { useContext } from "react";
import { SocketContext } from "./Socketcontext";
import { useEffect } from "react";
import ReactPlayer from "react-player";
const Videoplayer = () => {
  const { name, callAccepted, myvideo, userVideo, callEnded, stream, call,userstream } =
  useContext(SocketContext);
  console.log(userVideo);
  useEffect(()=>{
  // console.log(userVideo,myvideo);
  console.log("mystream")
    console.log(userstream);
  if(myvideo.current){
    // myvideo.r
  //   if(myvideo.current.srcObject){

      myvideo.current.srcObject=stream;
    }
    // if(userVideo.current){
    //   // if(userVideo.current.srcObject){
    //     userVideo.current.srcObject=userstream;
    //   // }
    // }
  },[stream])
  useEffect(()=>{
  // console.log(userVideo,myvideo);
  console.log("userstream");
      console.log(userstream);
      // console.log(userVideo.current);
      if(userVideo.current){

        if("srcObject" in userVideo.current) {
          userVideo.current.srcObject = userstream;
        }
        else {
          userVideo.current.src = window.URL.createObjectURL(userstream);
        }
      }
  },[userstream])
  


  return (
    <div className="flex space-x-3">
      {stream && (
        <div>
          <p>{name || "name"}</p>
          <video className="w-48 h-44" playsInline muted ref={myvideo} autoPlay />
          {/* <ReactPlayer className="w-48 h-44" url={stream}  playing={stream !== null} /> */}
        </div>
      )}
      {callAccepted && !callEnded && (
        <div>
          <p>{call.name || "name"}</p>
          {/* <ReactPlayer className="w-48 h-44" url={userstream}  playing={userstream !== null} /> */}
          <video className="w-48 h-44" playsInline muted ref={userVideo} autoPlay />
        </div>
      )}
    </div>
  );
};

export default Videoplayer;
