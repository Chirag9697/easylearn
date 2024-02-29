import React, { useContext } from "react";
import { SocketContext } from "./Socketcontext";
import { useAlertStyles } from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import {useEffect} from "react";
const Options = ({ children }) => {
  const { me,setMe, callAccepted, name, setName, leavecall, calluser, callended } =
    useContext(SocketContext);
  const [idTocall, setIdtocall] = useState("");
  // const classes=useAlertStyles
//   useEffect(()=>{
    // socket.on("me",(id)=>setMe(id))
//   },[socket])
  return (
    <div>
      <div>
        {/* <form noValidate autoComplete='off'> */}
        <div>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <CopyToClipboard text={me}>
            <button>copy to clipboard</button>
          </CopyToClipboard>
        </div>
        <div className="mt-4">
          <input
            value={idTocall}
            onChange={(e) => setIdtocall(e.target.value)}
          />
          {callAccepted && !callended ? (
            <button onClick={leavecall}>Hang up</button>
          ) : (
            <button onClick={() => calluser(idTocall)}>call</button>
          )}
        </div>

        {/* </form> */}
      </div>
      {children}
    </div>
  );
};

export default Options;
