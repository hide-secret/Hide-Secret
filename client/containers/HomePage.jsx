import React, { useState, useEffect, Suspense } from 'react'
// import Map from '../components/Map'
import {Redirect, useLocation} from 'react-router-dom'
import Header from '../components/Header'

const Map = React.lazy(() => import('../components/Map'))
const HomePage = () => {
    const location = useLocation()
    // console.log('LOCATION', location.state.userID)
    const [coord, setCoord] =  useState({})

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            setCoord({latitude: position.coords.latitude, longitude: position.coords.longitude})
          });
    },[])


    console.log('position.coords.lat ', coord)
    console.log(location)
    return (
        <>
        { 
        location.state !== undefined ?
        <Suspense fallback={<div className="loading"></div>}>
            <Header userID={location.state.userID} />
            <Map coord={coord} userID={location.state.userID}/>
        </Suspense>
        :
        <Redirect to='/'/>
        }
        </>
    )
}

export default HomePage;