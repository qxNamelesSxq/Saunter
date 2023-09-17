import { useEffect, useState } from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';
import { API_KEY, LIBRARIES } from '../../const/api';
import { useAppDispatch } from '../../redux/hook';
import { setDistance } from '../../redux/setDistance/setDistance';
import { setMarkersArray } from '../../redux/setMarkersArray/setMarkersArray';


interface MarkerType {
  position: {
    lat: number,
    lng: number
  }
}
  const center = {
    lat: 48.4648,
    lng: 35.0463
  };

const Map = () => {

  const mapContainerStyle = {
    height: '400px',
    width: '100%'
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES
  });
  const dispatch = useAppDispatch();
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  // Обработчик клика на карте, который добавляет новый маркер в список
  const handleMapClick = (event: any) => {
    if (event.latLng) {
      const newMarker: MarkerType = {
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
      };
      setMarkers([...markers, newMarker]);

    }
  };

  // Обработчик клика на маркере, который удаляет маркер из списка
  const handleMarkerClick = (index: number) => {
    const newMarkers = [...markers];
    newMarkers.splice(index, 1);
    setMarkers(newMarkers);
  };


  useEffect(() => {
    createLength();
    dispatch(setMarkersArray(markers));
  }, [markers]);


  const createLength = () => {
    if (markers.length > 1) {
      let sum = 0;
      const distances = markers.slice(0, -1).map((marker, i) => {
        const point1 = new google.maps.LatLng(marker.position.lat, marker.position.lng);
        const point2 = new google.maps.LatLng(markers[i + 1].position.lat, markers[i + 1].position.lng);
        return google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
      });
      distances.map((item: number) => sum += item);
      dispatch(setDistance(Math.round(sum)));

    } else {
      dispatch(setDistance(0));
    }
  }

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;

  return isLoaded ? (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={17} onClick={handleMapClick}>
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} onClick={() => handleMarkerClick(index)} />
      ))}
      {markers.length > 1 && (
        <Polyline path={markers.map(marker => marker.position)} options={{ strokeColor: '#FF0000' }} />
      )}
    </GoogleMap>

  ) : (
    <div>Loading...</div>
  );
};

export default Map;