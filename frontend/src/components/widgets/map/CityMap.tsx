import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTimeout } from 'timers';
import { markers } from './coordinates';


export default function CityMap(props: any) {

    let [center, setCenter] = useState<[number, number]>([0, 0])
    let [loaded, setLoaded] = useState<boolean>(false)
    let navigate = useNavigate()
    const gymResults = useSelector(
        (state: any) => state.gymResults.filteredGyms
    );

    useEffect(() => {
        setLoaded(false)
        let cityTuple: any = markers.find((marker) => {
            return marker.city === props.city
        })
        console.log(gymResults)
        setCenter(cityTuple.coordinates)
        setLoaded(true)
    }, [])


    const displayGymMarker = (gym: any) => {
        console.log(gym)
        return <Marker position={gym.coordinates}
            eventHandlers={{
                mouseover: (e) => {
                    console.log("center")
                    e.target.openPopup()
                },
                click: (e) => {
                    navigate(`/gym/${gym._id}`);
                }
            }}>
            <Popup>
                {gym.name}
            </Popup>
        </Marker>
    }



    return (
        <>
            {loaded ?
                <MapContainer style={{ height: "500px", width: "80vw" }} center={center} zoom={12} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <>
                        {props.item === 'gym' ? gymResults.map((gym: any) => displayGymMarker(gym)) : ''}
                        {/* {gymResults.map((gym: any) => {

                            return <Marker position={gym.coordinates}
                                eventHandlers={{
                                    click: (e) => {
                                        console.log("center")
                                        // props.setCity(marker.city)
                                    },
                                }}>
                                <Popup>
                                    Venue
                                </Popup>
                            </Marker>

                        })} */}
                    </>

                    {/* <Marker position={center}
                        eventHandlers={{
                            click: (e) => {
                                console.log("center")
                                // props.setCity(marker.city)
                            },
                        }}>
                        <Popup>
                            Venue
                        </Popup>
                    </Marker> */}

                </MapContainer>

                : ''
            }

        </>
    )
}
