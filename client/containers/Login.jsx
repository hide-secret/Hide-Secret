import React, { useState } from "react"
import { GoogleLogin } from "react-google-login"
import '../styles/styles.scss'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const clientId = "1021045324608-gr7ao84frl5bk4iflnrt32oaos6cu9pt.apps.googleusercontent.com"
const Login = ({setUserId}) => {
    let history = useHistory()
    // create our hooks for username
    const [username, setUsername] = useState('')
    // create hook for passowrd
    const [password, setPassword] = useState('')
    // onlick function to handle saving user input in form

    // create post request for authentication to backend

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/user/login', 
        {username, password}
        ).then((data) => {
        setUserId(data.data[0].userid) 
        history.push('/homepage', {userID: data.data[0].userid})
        })
        .catch((err) => console.log(err))
    }
    
    return (
        <div className="overall-container">
        <div className="login-container">
        <div className="title">
            <p>Hide  <span className="amp"> & </span>  Secret</p>
        </div>

            <form action="/user/login" method="POST" onSubmit={onSubmit}>
                <div className="username-container">
                    <input className="login-input" 
                    type="text" 
                    placeholder="username" 
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="password-container">
                    <input 
                    className="login-input" 
                    type="password" 
                    placeholder="password"
                    value={password || ''}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>   
                <div className="button-container">
                    <input type="submit" className="btn" value="Log in"/>
                </div>

                <div className="signup-container">
                <a href="/signup">Create account</a>
                </div>
            </form>
         
        
        <div className="google-login-container">
        <GoogleLogin
            clientId={clientId}
            buttonText={"Log in with Google"}
            // onSuccess={onSuccess}
            // onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
        </div>
        </div>
        </div>
    )
}

export default Login