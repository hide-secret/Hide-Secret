import React, { useContext, useState, useEffect } from 'react'
import { MenuContext } from 'react-flexible-sliding-menu'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import swal from 'sweetalert'
import axios from 'axios'
import {getDistanceFromLatLonInMeters, deg2rad} from '../haversine_formula/formulas'


const MIN_DIST_TO_VIEW_SECRET = 10;

const Map = ({coord, userID}) => {
    const { toggleMenu } = useContext(MenuContext)
    const [data, setData] = useState([])
		
    useEffect(() => {
        findMarker()
    },[])

    const findMarker = () => {
        axios.get('http://localhost:3000/secrets')
        .then(data => setData([...data.data]))
        .catch((err) => console.log(err))
    }

    const dropSecret = () => {
            swal({
                text: "What's your secret?",
                content: "input",
                button: {
                    text: "Stash secret here",
                    closeModal: false,
                }
            }).then(msg => {
							if(msg !== null) {
                const location = window.navigator && window.navigator.geolocation
                location.getCurrentPosition(position => {
                    axios.post('http://localhost:3000/secrets',
                    {
                        message: msg,
                        userID,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
										}).then(()=>{
                        findMarker()
                        swal.stopLoading()
                        swal.close()
                    }).catch(err => err)
								})
							}else{
								swal.stopLoading()
								swal.close()
							}
            }).catch(err=> {
                if (err) {
                    swal("oh no, failed")
                } else {
                    swal.stopLoading()
                    swal.close()
                }})
    }

    const displayText = (e, idx) =>{
        console.log(e)
        swal({
            title: "Do You Want to View This Secret?",
            text: "Once viewed, the secret will no longer show up for others!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
							const location = window.navigator && window.navigator.geolocation
							location.getCurrentPosition(position => {
								let dist_away = Math.trunc(getDistanceFromLatLonInMeters(+e.latitude,+e.longitude,position.coords.latitude,position.coords.longitude))
								// console.log(dist_away)
								if(dist_away < MIN_DIST_TO_VIEW_SECRET){
									if(e.userid !== userID){
										axios.patch('http://localhost:3000/secrets/',
										{
												secretsID: e.secretsid,
												userID: userID,
										}).then(()=>{
												swal("Secret", e.message.charAt(0).toUpperCase() + e.message.slice(1))
											.then(()=>{
													findMarker()
											});
										}).catch(()=>{
											swal({
													title: "Error",
													text: "Error while viewing secret, please try again at a later time!",
													icon: "error",
												});
										})
									}else{
										swal('Whoops!', 'Looks like you are trying to claim your own secret','error')
									}
							}else{
								swal("Too Far Away!", `You are ${dist_away}ft away from viewing this secret!`, 'error')
							}
						})
            } else {
              swal("Come back when you're ready!");
            }
          });
    }


    return (
    <div className="map-container">
			<div className="google-map">
			<LoadScript
					googleMapsApiKey="AIzaSyBvZynNRXAcbZte4W87A9TjUu7A4C4W5b0"
			>
					<GoogleMap
							mapContainerStyle={{width: '100vw', height: '100%'}}
							center={{lat: coord.latitude, lng: coord.longitude}}
							zoom={15}
							options={{disableDefaultUI: true}}
					>

					{data && data.map((el, idx) => {
							return (
							<Marker
									key={idx}
									position={{lat: +el.latitude, lng: +el.longitude}}
									onClick={()=>{displayText(el, idx)}}
							/>)
					})}

					<></>
					</GoogleMap>
			</LoadScript>
		</div>
    <div className="dropSecret-container">
        <button className="dropSecret-btn"
            onClick={dropSecret}
            >
            Drop Secret
        </button>
    </div>
    </div>
    )
}

export default Map;



