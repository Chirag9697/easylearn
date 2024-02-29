import React, { useContext } from 'react'
import { SocketContext } from './Socketcontext';
const Notifications = () => {
    const{answercall,call,callAccepted}=useContext(SocketContext);
    console.log("calling status");
    console.log(call)
    console.log(callAccepted);
  return (
    <>
        {call.isReceivedCall && !callAccepted && (
            <div>
                <h1>{call.name} is calling</h1>
                <button onClick={answercall}>answer</button>
            </div>
        )}
    </>
  )
}

export default Notifications;