import React, { useContext, useState, useEffect } from 'react'
import { MenuContext } from 'react-flexible-sliding-menu'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from './Header'
import axios from 'axios'
import swal from 'sweetalert';
import {useLocation} from 'react-router-dom'

const Map = ({coord}) => {
    const { toggleMenu } = useContext(MenuContext)
    const [data, setData] = useState([])
    const location = useLocation()
    console.log('LOCATION', location.state.userID)

    const mark = [{lat: 40.7599009, lng: -73.8337662}, {lat: 40.7599003, lng: -73.8331661}, {lat: 40.7594003, lng:  -73.3337635}]
    useEffect(() => {
        axios.get('http://localhost:3000/secrets')
        .then(data => setData([...data.data]))
        .catch((err) => console.log(err))

    }, [])

    return (
    <div className="map-container">
        <Header />
    <LoadScript 
        googleMapsApiKey="AIzaSyBvZynNRXAcbZte4W87A9TjUu7A4C4W5b0"
    >
        <GoogleMap
            mapContainerStyle={{width: '100vw', height: '95%'}}
            center={{lat: coord.latitude, lng: coord.longitude}}
            zoom={15}
            options={{disableDefaultUI: true}}
        >

        {mark && mark.map((el) => {
            console.log("position", el)
            return (<Marker 
            position={el}
            label={"this be a test message yo"}
            />)
        })}
            
        <></>
        </GoogleMap>
    </LoadScript>

        <div className="dropSecret-container">
            <button 
            onClick={ ()=> {
                swal({
                    text: "What's your secret?",
                    content: "input",
                    button: {
                        text: "Stash secret here",
                        closeModal: false,
                    }
                }).then(msg => {
                    fetch('http://localhost:3000/secrets', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            message: msg,
                            userID: location.state.userID,
                            latitude: coord.latitude,
                            longitude: coord.longitude,
                        }),
                    })
                    .then((res) => res.json())
                    .then(swal.close())
                }).catch(err=> {
                    if (err) {
                        swal("oh no, failed")
                    } else {
                        swal.stopLoading()
                        swal.close()
                    }})
     
               }} 
            className="dropSecret-btn">
            Drop Secret
        </button> 
    </div>
    </div>
    )
}

export default Map;



