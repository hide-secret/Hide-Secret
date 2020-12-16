import React, { useState } from 'react'
import {useLocation} from 'react-router-dom'


const PopupMessage = ({latitude, longitude}) => {
    const [message, setMessage] = useState("")
    const location = useLocation()
    console.log('LOCATION', location.state.userID)
    const sendingSecret = (e) => {
        e.preventDefault()
        //fetch to /secrets 
        //post method 
        //send ID, UserID, Latitude, Longitude in body 
        fetch('/secrets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                latitude: latitude,
                longitude: longitude,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }

    return (
    <>
      <div className="popup-message">
        <form onSubmit={sendingSecret}>
        <textarea 
        placeholder="Write your secret here..." className="user-message-input">
        onChange={(e)=> e.setMessage(e.target.value)}
        </textarea>
        <button className="submit-secret-btn"></button>
        </form>
      </div>
    </>
    )
}

export default PopupMessage;