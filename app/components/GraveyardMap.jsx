import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { useState, useRef, useContext } from 'react';
import { UpdateEmlekadatlapContext } from '../UpdateEmlekadatlapContext';


const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 47.497913, // Budapest középpontja
  lng: 19.040236,
};

export default function GraveyardMap() {
  const [position, setPosition] = useState(center);
  const autocompleteRef = useRef(null);
  const { updateFormData } = useContext(UpdateEmlekadatlapContext);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      const newCoords = {
        lat: location.lat(),
        lng: location.lng(),
      };
      setPosition(newCoords);
      updateFormData("graveyard", place.formatted_address || `${newCoords.lat}, ${newCoords.lng}`);
    }
  };

  const handleMapClick = (e) => {
    const newCoords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setPosition(newCoords);
    updateFormData("graveyard", `https://www.google.com/maps/place/${newCoords.lat},${newCoords.lng}`);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Keresés a térképen..."
          className="border border-gray-300 rounded-xl p-2 mb-2 w-full"
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={14}
        onClick={handleMapClick}
        mapTypeId="satellite"
      >
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
}
