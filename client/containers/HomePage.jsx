import React, { useState, useEffect } from 'react'
import Map from '../components/Map'


const HomePage = () => {

    const [coord, setCoord] =  useState({})

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("this is position ", position)
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            setCoord({latitude: position.coords.latitude, longitude: position.coords.longitude})
          });
    },[])


    console.log('position.coords.lat ', coord)
    return (
        <>
        <Map coord={coord}/>
        </>
    )
}

export default HomePage;