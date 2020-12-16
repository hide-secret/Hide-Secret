import React, { useState, useEffect, Suspense } from 'react'
// import Map from '../components/Map'

const Map = React.lazy(() => import('../components/Map'))
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
        <Suspense fallback={<p>loading</p>}>
        <Map coord={coord}/>
        </Suspense>
        </>
    )
}

export default HomePage;