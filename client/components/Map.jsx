import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({coord}) => {

    const mark = [{lat: 37.5643300, lng: -121.986}, {lat: 38.00, lng: -122}, {lat: 36.4, lng: -120}]


    const [latitude, setLatitude] = useState(coord.latitude)
    const [longitude, setLongitude] = useState(coord.longitude)
    const [map, setMap] = useState(null)

    useEffect(() => {
        setLatitude(coord.latitude)
        setLongitude(coord.longitude)
    }, [coord.latitude, coord.longitude])

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    },[])

    return (
    <LoadScript 
        googleMapsApiKey="AIzaSyBvZynNRXAcbZte4W87A9TjUu7A4C4W5b0"
    >
        <GoogleMap
            mapContainerStyle={{width: '100vw', height: '90vh'}}
            center={{lat: latitude, lng: longitude}}
            zoom={15}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
            options={{disableDefaultUI: true}}
        >
            {mark && mark.map((el) => {
                <Marker position={el}/>
            })}
        <></>
        </GoogleMap>
    </LoadScript>
        )
}

export default Map;