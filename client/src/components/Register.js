import React, { useState } from 'react'
import { Input, Button } from 'semantic-ui-react'
import axios from 'axios'
import { useHistory, Link } from "react-router-dom";
const Register = () => {
    let history = useHistory();
    const [username, setUR] = useState();
    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    // const [user,setUser] = useState({});
    const postdata = async (e) => {
        e.preventDefault();
        console.log(password);
        console.log(username);
        console.log(email);
        const res = await axios({
            method: "POST",
            url: `api/v1/register`,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                username, email, password
            }),
            responseType: "json"
        })
        .then(res => {
            console.log(res);
            history.push('/login');
        })
        .catch((error) => {
            document.getElementById('emess').innerHTML= error.response.data.error;
            console.log("2",error.response);
        })
    }
    return (
        <div className="authcontainer">
            <div className="formcntr">
                <h1>Please Register yourself</h1>
                <form onSubmit={postdata} className="form">
                    <Input label="username" value={username} onChange={(e) => setUR(e.target.value)} />
                    <Input label="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type='password' label="password" value={password} onChange={(e) => setPass(e.target.value)} />
                    <Button positive onClick={postdata}>Register</Button>
                </form>
                <div id="emess" style={{color:"red"}}></div>
                <div className="already">
                    <h3>Already have an account</h3>
                    <Link to="/login">
                        <Button color='black'>Login</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register