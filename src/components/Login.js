import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setlogin] = useState (true)
    const [token, setToken] = useCookies(['mytoken'])

    // When the user login it directly takes to the articles page
    let history = useHistory()

    useEffect(() => {
        if(token['mytoken']) {
            history.push('/articles')
        }
        // doing the function above based on token, mentioned below.
    }, [token])

    const logingBtn =() => {
        APIService.LoginUser({username, password})
        .then(resp => setToken('mytoken',resp.token))
    }


    const RegisterBtn = () => {
        APIService.RegisterUser({username, password})
        .then(() => logingBtn ())
    }


    return (
        <div className="App">
            <br/>
            {isLogin ?  <h1>Please Login</h1> : <h1>Please Register</h1>}
            <br/>
            <div className = "mb-3">
                <label htmlFor = "username" className = "form-label">Username</label>
                <input type = "text" className= "form-control" id="username" placeholder="Please Enter Username" value={username} onChange = {e => setUsername(e.target.value)}
                />
            </div>
            <div className = "mb-3">
                <label htmlFor = "password" className = "form-label">Password</label>
                <input type = "password" className= "form-control" id="password" placeholder="password" value={password} onChange = {e => setPassword(e.target.value)}
                />
            </div>

            {isLogin ? <button onClick = {logingBtn} className = "btn btn-primary"> Login </button> : <button onClick = {RegisterBtn} className = "btn btn-primary"> Register </button>
            }
            


            <div className = "mb-3">
                {isLogin ? <h5>if you don't have account, pleae <button className = "btn btn-primary" onClick = {() => setlogin(false)} >Register</button>Here</h5>
                : <h5>if You Have Account, Please<button className = "btn btn-primary" onClick = {() => setlogin(true)} >Login</button>Here</h5>
            }
            </div>
        </div>
    )
}

export default Login
