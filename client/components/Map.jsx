import React, { useContext } from 'react'
import { MenuContext } from 'react-flexible-sliding-menu'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import dropSecret from '../assets/dropSecret.png'
import Header from './Header'

const Map = ({coord}) => {

    const { toggleMenu } = useContext(MenuContext)


    const mark = [{lat: 40.7599009, lng: -73.8337662}, {lat: 40.7599003, lng: -73.8331661}, {lat: 40.7594003, lng:  -73.3337635}]

    

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
            
            position={el}/>)
    
        })}
            
        <></>
        </GoogleMap>
    </LoadScript>

    
   
        <div className="dropSecret-container">
           
    <a href="#" class="button" className="dropSecret-btn">
    Drop Secret
  </a> 
        
    </div>
    </div>
        )
}

export default Map;


//still need functionality to remove marker position after user gets secret