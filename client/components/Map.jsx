import React, { useContext, useState, useEffect } from 'react'
import { MenuContext } from 'react-flexible-sliding-menu'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from './Header'
import PopupMessage from './PopupMessage'
import axios from 'axios'

const Map = ({coord}) => {
    const { toggleMenu } = useContext(MenuContext)
    const [data, setData] = useState([])
    // const {popup, showPopup} = useState(false)

    const mark = [{lat: 40.7599009, lng: -73.8337662}, {lat: 40.7599003, lng: -73.8331661}, {lat: 40.7594003, lng:  -73.3337635}]

    // const togglePopup = () => {
    //     console.log('in toggle popuup')
    //     showPopup ? showPopup=false : showPopup=true
    // }
    useEffect(() => {
        axios.get('http://localhost:3000/secrets')
        .then(data => setData([...data.data]))
        .catch((err) => console.log(err))

    }, [])

// console.log("DATA", data)
//    const mark = data.map(el => {
//        return {
//            lat: el.latitude,
//            lng: el.longitude
//        }
//    })


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
                if (popup) return (
              <PopupMessage 
              latitude={coord.latitude}
              longitude={coord.longitude}
               />)
               else showPopup()
               }} 
            className="dropSecret-btn">
            Drop Secret
        </button> 
    </div>
    </div>
    )
}

export default Map;


//still need functionality to remove marker position after user gets secret

