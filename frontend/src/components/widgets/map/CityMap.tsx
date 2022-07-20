import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { markers } from './coordinates';


export default function CityMap(props: any) {

    let [center, setCenter] = useState<[number, number]>([0, 0])
    let [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        setLoaded(false)
        let cityTuple: any = markers.find((marker) => {
            return marker.city === props.city
        })
        setCenter(cityTuple.coordinates)
        setLoaded(true)
    }, [])


    return (
        <>
            {loaded ?
                <MapContainer style={{ height: "500px", width: "80vw" }} center={center} zoom={14} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={center}
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

                </MapContainer>

                : ''
            }

        </>
    )
}
