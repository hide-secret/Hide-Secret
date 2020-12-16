import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({coord}) => {

    const mark = [{lat: 40.7599009, lng: -73.8337662}, {lat: 40.7599003, lng: -73.8331661}, {lat: 40.7594003, lng:  -73.3337635}]

    const [latitude, setLatitude] = useState(coord.latitude)
    const [longitude, setLongitude] = useState(coord.longitude)
    const [map, setMap] = useState(null)


const onLoad = marker => {
    console.log('marker: ', marker.position)
  }
    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    },[])


    return (
    <LoadScript 
        googleMapsApiKey="AIzaSyBvZynNRXAcbZte4W87A9TjUu7A4C4W5b0"
    >
        <GoogleMap
            mapContainerStyle={{width: '100vw', height: '90vh'}}
            center={{lat: coord.latitude, lng: coord.longitude}}
            zoom={15}
            options={{disableDefaultUI: true}}
        >

        {mark && mark.map((el) => {
            console.log("position", el)
            return (<Marker 
            
            position={el}/>)
    
        })}
            
        <></>
        </GoogleMap>
    </LoadScript>
        )
}

export default Map;


//still need functionality to remove marker position after user gets secret