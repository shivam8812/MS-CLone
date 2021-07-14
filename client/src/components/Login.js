import React, { useEffect, useState } from 'react'
import { Input, Button } from 'semantic-ui-react'
import axios from 'axios'
import { useHistory, Link } from "react-router-dom";
const Login = (props) => {
    let history = useHistory();
    const [username, setUR] = useState();
    const [password, setPass] = useState();
    const postdata = async (e) => {
        e.preventDefault();
        console.log(password);
        console.log(username);
        const res = await axios({
            method: "POST",
            url: `http://localhost:5000/api/v1/login`,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                username, password
            }),
            responseType: "json"
        })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', res.data.username);
                history.push('/home');
                window.location.reload();
            })
            .catch((error) => {
                document.getElementById('emess').innerHTML= error.response.data.error;
            })
        // const data = await res.json();
        // console.log(data);
    }
    return (
        <div className="authcontainer gradient">
            <div className="formcntr">
                <h1>Please Login yourself</h1>
                <form onSubmit={postdata} className="form">
                    <Input label="username" value={username} onChange={(e) => setUR(e.target.value)} />
                    <Input type='password' label="password" value={password} onChange={(e) => setPass(e.target.value)} />
                    <Button positive onClick={postdata}>Login</Button>
                </form>
                <div id="emess" style={{color:"red"}}></div>
                <div className="already">
                    <h3>Don't have an account</h3>
                    <Link to="/">
                        <Button color='black'>Register</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
