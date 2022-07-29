import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { markers } from "./coordinates";

export default function Map(props: any) {
  let [presentCities, setPresentCities] = useState<string[]>([]);
  let [loaded, setLoaded] = useState<boolean>(false);
  let navigate = useNavigate();

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

  useEffect(() => {
    let aux: any[] = [];
    props.cities.forEach((city: any) => {
      aux.push(city.label);
    });
    setPresentCities([...aux]);
    setLoaded(true);
  }, []);

  const displayMarkers = (marker: any) => {
    if (presentCities.includes(marker.city)) {
      return (
        <Marker
          icon={redMarker}
          position={marker.coordinates}
          eventHandlers={{
            click: (e) => {
              props.setCity(marker.city);
              navigate(
                `/results/${
                  props.type === "gyms" ? "gyms" : "courses"
                }/search?name=&city=${marker.city}`
              );
            },
            mouseover: (e) => {
              e.target.openPopup();
            },
            mouseout: (e) => {
              e.target.closePopup();
            },
          }}
        >
          <Popup>{marker.city}</Popup>
        </Marker>
      );
    }

    return "";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "60px",
      }}
    >
      <MapContainer
        center={[51.505, 10.4515]}
        zoom={5.5}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <>{markers.map((marker) => displayMarkers(marker))}</>
      </MapContainer>
    </div>
  );
}
