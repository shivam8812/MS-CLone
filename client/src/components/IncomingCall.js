import React, { useContext } from 'react';
import { SocketContext } from '../Context';
import { Button } from 'semantic-ui-react'
import '../global.css'
const IncomingCall = () => {
  const { answerCall, call, callAccepted,hangCall } = useContext(SocketContext);

  return (
    <div className="incall-cntr">
      {call.isReceivingCall && !callAccepted && (
        <div className="incall">
          <h1 className="incall-name">{call.name} is calling:</h1>
          <div className="buts">
          <Button className="ic-button" positive onClick={answerCall}>
            Answer
          </Button>
          <Button className="ic-button" negative onClick={hangCall}>
            Hang up
          </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomingCall;
