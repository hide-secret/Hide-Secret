import React, {useState} from "react";
const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const onSubmit = (e) => {
        e.prevenDefault();
        fetch('/signup', {
            method: 'POST',
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
        Create an account
     </div>
     <div className="signup-form">
     <form action="/" method="POST" onSubmit={onSubmit}>
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
                 <button className="btn">Sign Up</button>
             </div>
         </form>
      
     </div>
     <div className="return-btn-div">
     <a href="/">Go back to login</a>
     </div>
        </div>
        </div>
        )
}

export default Signup;
