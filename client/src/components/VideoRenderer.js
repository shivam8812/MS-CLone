import React, { useContext,useState,useEffect,useRef,useCallback } from 'react';
import { SocketContext } from '../Context';
import './comps.css'

const VideoRenderer = () => {
  const { me,name,myVideo,stream, callAccepted, userVideo, callEnded, call } = useContext(SocketContext);
  // const myvideo = useRef();
  // const [stream,setStream] = useState();
  // const offVideo =(e)=>{
  //   e.preventDefault();
  //   myvideo.current.srcObject = null;
  // }
  // useEffect(() => {
  //   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  //     .then((currentStream) => {
  //       setStream(currentStream);
  //       // if(myvideo.current)
  //       myvideo.current.srcObject = currentStream;
  //     });
  // }, []);
  console.log(me);
  return (
    <div container className="videocontainer">
        <div className="vppaper">
          <div className="singlevideo">
            <div id="video">
            <h2>{name || 'Name'}</h2>
            <video playsInline muted ref={myVideo} autoPlay className="video" />
            </div>
            {/* <button onClick={offVideo}>video off</button> */}
          </div>
        </div>
      {callAccepted && !callEnded && (
        <div className="vppaper">
          <div className="singlevideo">
            <h2>{call.name || 'Name'}</h2>
            <video playsInline ref={userVideo} autoPlay className="video" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRenderer;
