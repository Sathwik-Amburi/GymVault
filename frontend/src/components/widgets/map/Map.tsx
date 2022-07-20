import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { markers } from './coordinates';


export default function Map() {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: "60px" }}>

            <MapContainer center={[51.505, 10.4515]} zoom={5.5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <>
                    {markers.map((marker) =>
                        <Marker position={marker.coordinates}>
                            <Popup>
                                {marker.city}
                            </Popup>
                        </Marker>
                    )}
                </>

            </MapContainer>
        </div>
    )
}
