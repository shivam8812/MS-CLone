import React, { useState, useContext, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../Context';
import { Button, Input } from 'semantic-ui-react'
import './comps.css'
import { io } from 'socket.io-client';


const Controller = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, setMe } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  // setName(localStorage.getItem('username'));
  const generateId = (e) => {
    // e.preventDefault();
    //socket.on('me', (id) => setMe(id));
  }
  return (
    <div className="container">
      <div className="paper">
        <form className="root" noValidate autoComplete="off">
          <div container className="gridContainer">
            <div className="padding">
              <Input disabled placeholder="YourId..." label="YourId" value={me} onChange={(e) => setName(e.target.value)} />
              <div className="idButtons">
                <CopyToClipboard text={me} className="margin">
                  <Button color='blue' onClick={(e) => {
                    e.preventDefault();
                  }}>Copy your id</Button>
                </CopyToClipboard>
                <Button className="margin" color='black' onClick={generateId}>Generate new id</Button>
              </div>
            </div>
            <div className="padding">
              <Input placeholder="Id..." label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <Button negative onClick={(e) => {
                  e.preventDefault();
                  leaveCall()}} className="margin">
                  Hang Up
                </Button>
              ) : (
                <Button positive onClick={(e) => {
                  e.preventDefault();
                  callUser(idToCall)
                }} className="margin">
                  Call
                </Button>
              )}
            </div>
          </div>
        </form>
        {children}
      </div>
    </div>
  );
};

export default Controller;
