import React from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { API_KEY, LIBRARIES } from "../../const/api";
import { useAppSelector } from "../../redux/hook";

interface MarkerType {
  position: {
    lat: number;
    lng: number;
  };
}

const MapInfo: React.FC = () => {
  const id = useAppSelector((state) => state.setIdReducer.id);
  const tripInfo = useAppSelector((state) => state.fetchReducer.data).find(
    (e) => e.id === id
  );

  const mapContainerStyle = {
    height: "300px",
    width: "100%",
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES,
  });

  const markers: MarkerType[] = tripInfo?.markers || [];
  const center = markers.length > 0 ? markers[0].position : { lat: 0, lng: 0 };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={17}>
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} />
      ))}
      {markers.length > 1 && (
        <Polyline
          path={markers.map((marker) => marker.position)}
          options={{ strokeColor: "#FF0000" }}
        />
      )}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default MapInfo;
