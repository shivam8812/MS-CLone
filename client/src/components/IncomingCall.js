import React, { useContext } from 'react';
import { SocketContext } from '../Context';
import { Button } from 'semantic-ui-react'
import '../global.css'
const IncomingCall = () => {
  const { answerCall, call, callAccepted,hangCall } = useContext(SocketContext);

  return (
    <div>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button className="margin" positive onClick={answerCall}>
            Answer
          </Button>
          <Button className="margin" negative onClick={hangCall}>
            Hang up
          </Button>
        </div>
      )}
    </div>
  );
};

export default IncomingCall;
