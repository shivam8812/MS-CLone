import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { SocketContext } from '../Context';
import {Icon} from 'semantic-ui-react'
import './comps.css'

const VideoRenderer = () => {
  const { me, name, myVideo, stream, callAccepted, userVideo, callEnded, call, toggleVideo,toggleAudio,audioStatus } = useContext(SocketContext);

  console.log(me);
  return (
    <div container className="videocontainer">
      <div className="vppaper">
        <div className="singlevideo">
          <div id="video">
            <h2 className="name">{name || 'Name'}</h2>
            <video playsInline muted ref={myVideo} autoPlay className="video" /> <br />
            <div className="togglebuttons">
             <Icon size="big" fitted name="video" onClick={(e) => toggleVideo(e)} />
             <Icon size="big" fitted name={audioStatus?"microphone slash":"microphone"} onClick={(e) => toggleAudio(e)} />
            </div>
          </div>
          {/* <button onClick={offVideo}>video off</button> */}
        </div>
      </div>
      {callAccepted && !callEnded && (
        <div className="vppaper">
          <div className="singlevideo">
            <h2 className="name">{call.name || 'Name'}</h2>
            <video playsInline ref={userVideo} autoPlay className="video" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRenderer;
