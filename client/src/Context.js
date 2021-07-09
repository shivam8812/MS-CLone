import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

// const socket = io("http://localhost:5000/");
const socket = io();
const ContextProvider = ({ children }) => {
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [audioStatus, setAudioStatus] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        setAudioStatus(true);
        if (myVideo.current)
          myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));
    console.log(me);
    setName(localStorage.getItem('username'));
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
    console.log(call);
  }, []);


  const hangCall = () => {
    setCallAccepted(false);
    setCall({ isReceivingCall: false });
    window.location.reload();
  }

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
    console.log("peer",peer);
    console.log(call);
  };
  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
    console.log("peer",peer);
    console.log(call);
  };
  const toggleVideo = (e) => {
    e.preventDefault();
    myVideo.current.srcObject.getVideoTracks().forEach(track => track.enabled = !track.enabled);
  }
  const toggleAudio = (e) => {
    e.preventDefault();
    setAudioStatus(!(audioStatus));
    myVideo.current.srcObject.getAudioTracks().forEach(track => track.enabled = !track.enabled);
  }
  const closeStream = () =>{
    stream.getTracks().forEach(function(track) {
      if (track.readyState === 'live') {
          track.stop();
      }
  });
  }
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      callEnded,
      me,
      audioStatus,
      closeStream,
      toggleAudio,
      toggleVideo,
      setName,
      callUser,
      leaveCall,
      answerCall,
      setStream,
      hangCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
