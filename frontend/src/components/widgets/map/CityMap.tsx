import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { markers } from "./coordinates";

export default function CityMap(props: any) {
  var redMarker = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  let [center, setCenter] = useState<[number, number]>([0, 0]);
  let [loaded, setLoaded] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(12);
  let navigate = useNavigate();
  const gymResults = useSelector((state: any) => state.gymResults.filteredGyms);

  const courseResults = useSelector(
    (state: any) => state.courseResults.filteredCourses
  );

  useEffect(() => {
    setLoaded(false);
    let cityTuple: any = markers.find((marker) => {
      return marker.city === props.city;
    });
    if (props.item === "gymDetails") {
      setZoom(14);
      setCenter(props.gym.coordinates);
    } else {
      setCenter(cityTuple.coordinates);
    }

    setLoaded(true);
  }, []);

  const displayGymMarker = (gym: any) => {
    return (
      <Marker
        icon={redMarker}
        position={gym.coordinates}
        eventHandlers={{
          mouseover: (e) => {
            e.target.openPopup();
          },
          mouseout: (e) => {
            e.target.closePopup();
          },
          click: (e) => {
            navigate(`/gym/${gym._id}`);
          },
        }}
      >
        <Popup>
          {props.item === "gymDetails" ? (
            <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
              {gym.address}
            </span>
          ) : (
            <>{gym.name}</>
          )}
        </Popup>
      </Marker>
    );
  };

  const displayCourseMarker = (course: any) => {
    return (
      <Marker
        icon={redMarker}
        position={course.gymId.coordinates}
        eventHandlers={{
          mouseover: (e) => {
            e.target.openPopup();
          },
          mouseout: (e) => {
            e.target.closePopup();
          },
          click: (e) => {
            navigate(`/gym/${course.gymId._id}`);
          },
        }}
      >
        <Popup>{course.gymId.name}</Popup>
      </Marker>
    );
  };

  return (
    <>
      {loaded ? (
        <MapContainer
          style={{ height: "400px", width: "80vw" }}
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <>
            {props.item === "gym"
              ? gymResults.map((gym: any) => displayGymMarker(gym))
              : courseResults.map((course: any) => displayCourseMarker(course))}
            {props.item === "gymDetails" && displayGymMarker(props.gym)}
          </>
        </MapContainer>
      ) : (
        ""
      )}
    </>
  );
}
