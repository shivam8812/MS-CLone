import React, { useContext, useEffect } from 'react';
import '../global.css'
import { Button } from 'semantic-ui-react'
import VideoRenderer from './VideoRenderer';
import Controller from './Controller';
import IncomingCall from './IncomingCall';
import axios from 'axios';
import { useHistory } from 'react-router';

const Home = (props) => {
  const history = useHistory();
  const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      history.replace('/login');
      window.location.reload();
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
          history.replace('/login');
        })
    }

    checktoken(localStorage.getItem('token'));
  })
  return (
    <div className="wrapper">
      <div className="appBar">
        <div className="headandlog">
          <h2>Welcome {localStorage.getItem('username')}!</h2>
          <div className="logout">
          <Button className="" floated={'right'} negative onClick={logout} >Logout</Button>
        </div>
        </div>
        <h2 className="chat">Chat with your friends</h2>
      </div>
      <VideoRenderer />
      <Controller>
        <IncomingCall />
      </Controller>
    </div>
  );
};

export default Home;
