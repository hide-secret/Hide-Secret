import React, { useState } from "react"
import { GoogleLogin } from "react-google-login"
import '../styles/styles.scss'


const clientId = "1021045324608-gr7ao84frl5bk4iflnrt32oaos6cu9pt.apps.googleusercontent.com"
const Login = () => {
    // create our hooks for username
    const [username, setUsername] = useState('')
    // create hook for passowrd
    const [password, setPassword] = useState('')
    // onlick function to handle saving user input in form

    // create post request for authentication to backend

    const onSubmit = (e) => {
        e.prevenDefault();
        fetch('/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }
    
    return (
        <div className="overall-container">
        <div className="login-container">
        <div className="title">
            Hidden
        </div>
            <form action="/login" method="GET" onSubmit={onSubmit}>
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
                    <button className="btn">Login</button>
                </div>
            </form>
        <div className="signup-container">
        <a href="/signup">Create an account</a>
        </div>
        
        <div className="google-login-container">
        
            <GoogleLogin
                clientId={clientId}
                buttonText={"Login With Google"}
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