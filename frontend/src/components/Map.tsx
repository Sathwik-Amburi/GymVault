import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


export default function Map() {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom:"60px" }}>

            <MapContainer center={[51.505, 10.4515]} zoom={5.5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, 10.4515]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
