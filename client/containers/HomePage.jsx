import React, { useState, useEffect, Suspense } from 'react'
// import Map from '../components/Map'
import {useLocation} from 'react-router-dom'

const Map = React.lazy(() => import('../components/Map'))
const HomePage = () => {
    const location = useLocation()
    // console.log('LOCATION', location.state.userID)

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
        <Suspense fallback={<div className="loading"></div>}>
        <Map coord={coord}/>
        </Suspense>
        </>
    )
}

export default HomePage;