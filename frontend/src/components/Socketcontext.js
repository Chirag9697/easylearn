import React,{createContext,useState,useRef,useEffect} from 'react';
import {io}from 'socket.io-client';
import Peer from 'simple-peer';
const SocketContext=createContext();
const socket=io('http://localhost:3001');
const ContextProvider=({children})=>{
    const[stream,setStream]=useState(null);
    const[userstream,setuserStream]=useState(null);
    const[me,setMe]=useState('');
    const[call,setCall]=useState({});
    const[callAccepted,setCallAccepted]=useState(false);
    const[callended,setCallended]=useState(false);
    const[name,setName]=useState('');
    const myvideo=useRef();
    const userVideo=useRef();
    const connectionref=useRef();

    const startclass=async()=>{
        try{

            const currentstream=await navigator.mediaDevices.getUserMedia({video:true,audio:true})
            setStream(currentstream);
            if(myvideo.current)
            {
                // myvideo.current.srcObject=currentstream;
            }
        }catch(error){
            console.log(error);
        }          
    
            // }
            // if(myvideo.current.srcObject){
                    // }
                    socket.on('me',(id)=>setMe(id));
    }
        
        
    
        
    
    // },[]);
    const answercall=()=>{
        setCallAccepted(true);
        const peer=new Peer({initiator:false,trickle:false,stream});
        console.log("callfrom");
        console.log(call.from);
        peer.on('signal',(data)=>{
            socket.emit('answercall',{signal:data,to:call.from});
        })
        peer.on('stream',(currentstream)=>{
            console.log("user2stream");
            console.log(currentstream);
            // if(userVideo.current){

                // if("srcObject" in userVideo.current) {
                    userVideo.current.srcObject = currentstream;
                // }
                // else {
                    // userVideo.current.src = window.URL.createObjectURL(currentstream);
                // }
                setuserStream(currentstream);
                peer.signal(call.signal);
                connectionref.current=peer;
        })
    const calluser=(id)=>{
        console.log("hello");
        console.log(id);
        console.log(me);
        const peer=new Peer({initiator:true,trickle:false,stream});
        peer.on('signal',(data)=>{
            socket.emit('calluser',{userToCall:id,signalData:data,from:me,name});
        })
        peer.on('stream',(currentstream)=>{
            setuserStream(currentstream);
            console.log("user2stream");
            console.log(currentstream);
            // userVideo.current.srcObject=currentstream;
        })

        socket.on("callaccepted",(signal)=>{

            setCallAccepted(true);
            peer.signal(signal);
        })
        connectionref.current=peer;

    }
    const leavecall=()=>{
        setCallended(true);
        connectionref.current.destroy();

        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{
            call,
            setCall,
            callAccepted,
            myvideo,
            userVideo,
            stream,
            userstream,
            name,
            setName,
            callended,
            me,
            setMe,
            calluser,
            leavecall,
            answercall,
            startclass
        }}>
            {children}
        </SocketContext.Provider>
    )
}
}

export {ContextProvider,SocketContext} ;