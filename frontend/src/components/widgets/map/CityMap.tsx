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

    const courseResults = useSelector(
        (state: any) => state.courseResults.filteredCourses
    );

    useEffect(() => {
        setLoaded(false)
        let cityTuple: any = markers.find((marker) => {
            return marker.city === props.city
        })
        setCenter(cityTuple.coordinates)
        setLoaded(true)
    }, [])


    const displayGymMarker = (gym: any) => {
        return <Marker position={gym.coordinates}
            eventHandlers={{
                mouseover: (e) => {
                    e.target.openPopup()
                },
                mouseout: (e) => {
                    e.target.closePopup()
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


    const displayCourseMarker = (course: any) => {
        return <Marker position={course.gymId.coordinates}
            eventHandlers={{
                mouseover: (e) => {
                    e.target.openPopup()
                },
                mouseout: (e) => {
                    e.target.closePopup()
                }
            }}>
            <Popup>
                {course.gymId.name}
            </Popup>
        </Marker>
    }



    return (
        <>
            {loaded ?
                <MapContainer style={{ height: "400px", width: "80vw" }} center={center} zoom={12} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <>
                        {props.item === 'gym' ?
                            gymResults.map((gym: any) => displayGymMarker(gym)) :
                            courseResults.map((course: any) => displayCourseMarker(course))}
                    </>

                </MapContainer>

                : ''
            }

        </>
    )
}
