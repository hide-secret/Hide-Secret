import React from "react"
import { GoogleLogin } from "react-google-login"

const clientId = "1021045324608-gr7ao84frl5bk4iflnrt32oaos6cu9pt.apps.googleusercontent.com"
const Login = () => {
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                // onSuccess={onSuccess}
                // onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login