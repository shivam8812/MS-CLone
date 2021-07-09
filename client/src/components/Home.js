import React, { useContext, useEffect } from 'react';
import '../global.css'
import { Button } from 'semantic-ui-react'
import VideoRenderer from './VideoRenderer';
import Controller from './Controller';
import IncomingCall from './IncomingCall';
import axios from 'axios';
import { useHistory } from 'react-router';
import { SocketContext } from '../Context';

const Home = (props) => {
  const history = useHistory();
  const {closeStream,call,callAccepted} = useContext(SocketContext);
  const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      closeStream();
      history.replace('/login');
  }
  useEffect(() => {
    const checktoken = async (token) => {
      const res = await axios({
        method: "POST",
        url: `api/v1/checktoken`,
        headers: {
          "authorization": token,
        },
        responseType: "json"
      })
        .then(() => {
          // console.log("2",res);
        })
        .catch((err) => {
          console.log(err);
          closeStream();
          history.replace('/login');
        })
    }

    checktoken(localStorage.getItem('token'));
  })
  return (
    <div className="gradient">
    <div className="wrapper">
      <div className="appBar">
        <div className="headandlog">
          <div className="empty"></div>
          <h2>Welcome {localStorage.getItem('username')}! Chat with your friends</h2>
          <div className="logout">
          <Button className="" floated={'right'} negative onClick={logout} >Logout</Button>
        </div>
        </div>
      </div>
      <VideoRenderer />
      {call.isReceivingCall && !callAccepted?<IncomingCall />:<Controller />}
    </div>
    </div>
  );
};

export default Home;
